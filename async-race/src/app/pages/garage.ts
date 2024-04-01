import createCarElement, { EventActionEnum, ICarElement } from '../components/car/car';
import createGarageForm from '../components/forms/forms';
import {
    postCar,
    getCars,
    ICar,
    updateCar,
    deleteCarFromGarage,
    startEngine,
    drive,
    stopEngine,
    deleteWinner,
    getWinners,
    sendWinner,
} from '../api';
import { animateCar, createElement, getRandomColor, getRandomName } from '../utils';
import { IWinner } from './winners';

const CARS_PER_PAGE = 7;

interface GarageInterface extends HTMLElement {
    cars: ICarElement[];
    page: number;
    total: number;
    load: (page?: number) => Promise<void>;
}

function renderGarage(formUpdate: HTMLFormElement) {
    const self =
        (document.getElementById('garage') as GarageInterface) || createElement<GarageInterface>({ id: 'garage' });

    if (self.hasAttribute('data-rendered')) {
        return self;
    }

    self.page = 1;

    const infoCountElement = createElement<HTMLSpanElement>({ tag: 'span' });
    const infoCountPage = createElement<HTMLSpanElement>({ tag: 'span' });

    const carsContainerElement =
        document.getElementById('carsContainer') ||
        createElement({
            id: 'carsContainer',
            className: 'cars-container',
        });

    const prevButton = createElement<HTMLButtonElement>({ tag: 'button', className: 'button', textContent: 'prev' });
    const nextButton = createElement<HTMLButtonElement>({ tag: 'button', className: 'button', textContent: 'next' });

    prevButton.disabled = true;

    self.load = async (page: number = self.page) => {
        return getCars({ _page: page.toString(), _limit: CARS_PER_PAGE.toString() }).then(
            (data: { cars: ICar[]; count: number }) => {
                const carElements = data.cars.map((car) => {
                    const el = createCarElement(car);
                    el.addEventListener(EventActionEnum.DELETE, async () => {
                        const winners = await getWinners();
                        const winner = winners.find((winnerCar: IWinner) => car.id === winnerCar.id);
                        if (winner) {
                            await deleteWinner(car.id.toString());
                        }

                        await deleteCarFromGarage(car.id.toString());
                        self.load();
                    });
                    el.addEventListener(EventActionEnum.SELECT, () => {
                        formUpdate.classList.remove('form-disabled');
                        // eslint-disable-next-line no-restricted-syntax
                        for (const [key, value] of Object.entries(el.carData)) {
                            const input = formUpdate.elements.namedItem(key) as HTMLInputElement;
                            if (input) {
                                input.value = value;
                            }
                        }
                    });
                    el.addEventListener(EventActionEnum.START, async () => {
                        const abortStatusController = new AbortController();
                        const startButton = el.querySelector('#startBtn') as HTMLButtonElement;
                        const stopButton = el.querySelector('#stopBtn') as HTMLButtonElement;
                        startButton.disabled = true;
                        const startResp = await startEngine(car.id);
                        stopButton.disabled = false;
                        const duration = startResp.distance / startResp.velocity;
                        const carSVG = el.querySelector('.svg-container') as HTMLElement;

                        const animation = animateCar(el, carSVG, duration);

                        el.lastResult = duration;

                        el.addEventListener(
                            EventActionEnum.STOP,
                            async () => {
                                cancelAnimationFrame(animation.currentRequestId);
                                stopButton.disabled = true;
                                carSVG.style.left = '90px';
                                abortStatusController.abort();
                                await stopEngine(car.id);
                                startButton.disabled = false;

                                // const startRaceBtn = document.getElementById('startRace') as HTMLButtonElement;
                                // startRaceBtn.disabled = false;
                                // const buttons = el.querySelectorAll('button');
                                // buttons.forEach((btn) => btn.classList.remove('btn-disabled'));

                                // carSVG.style.opacity = '';
                                // carSVG.style.transform = '';
                            },
                            {
                                once: true,
                            }
                        );

                        try {
                            const observeStatusRequest = await drive(car.id, abortStatusController);
                            if (observeStatusRequest === 'engine broke') {
                                cancelAnimationFrame(animation.currentRequestId);
                                // carSVG.style.opacity = '0.5';
                                // carSVG.style.transform = 'rotate(-8deg)';
                            } else {
                                el.dispatchEvent(new Event(EventActionEnum.FINISHED));
                            }
                        } catch {
                            // cancelAnimationFrame(requestId);
                        }
                    });
                    return el;
                });
                self.cars = carElements;
                // self.addEventListener(EventActionEnum.START, async () => {
                //     console.log('t');
                // });
                // add car events

                // append
                Array.from(carsContainerElement.children).forEach((el) => {
                    el.remove();
                });
                carsContainerElement.append(...carElements);

                self.total = data.count;
                infoCountPage.textContent = `Page#${page}`;
                infoCountElement.textContent = `Garage(${data.count}) `;

                // next button
                if (page * CARS_PER_PAGE >= self.total) {
                    nextButton.disabled = true;
                } else {
                    nextButton.disabled = false;
                }

                // prev button
                if (page > 1) {
                    prevButton.disabled = false;
                } else {
                    prevButton.disabled = true;
                }

                self.page = page;
            }
        );
    };

    // set actions
    nextButton.addEventListener('click', () => {
        nextButton.disabled = true;
        self.load(self.page + 1);
    });
    prevButton.addEventListener('click', () => {
        prevButton.disabled = true;
        if (self.page > 1) {
            self.load(self.page - 1);
        }
    });

    self.append(infoCountElement, infoCountPage, carsContainerElement, prevButton, nextButton);

    self.setAttribute('data-rendered', '');
    self.load();

    return self;
}

export default async function renderGaragePage() {
    // page
    const garagePage = createElement({ className: 'garage-page' });

    // elements of the page
    const formCreate = createGarageForm('Create');
    const formUpdate = createGarageForm('Update');
    formUpdate.classList.add('form-disabled');

    const garage = renderGarage(formUpdate);

    formCreate.addEventListener('submit', async (e) => {
        e.preventDefault();
        await postCar(Object.fromEntries(new FormData(formCreate)));
        garage.load();
        formCreate.reset();
    });

    formUpdate.addEventListener('submit', async (e) => {
        e.preventDefault();
        formUpdate.classList.add('form-disabled');
        const id = (formUpdate.elements.namedItem('id') as HTMLInputElement)?.value;
        const name = (formUpdate.elements.namedItem('name') as HTMLInputElement)?.value;
        const color = (formUpdate.elements.namedItem('color') as HTMLInputElement)?.value;

        if (!id || !name || !color) {
            return;
        }

        const car: ICar = { id: parseInt(id, 10), name, color };

        await updateCar(parseInt(id, 10), car);
        garage.load();
        formUpdate.reset();
    });

    const actions = createElement({});

    const startRaceButton = createElement<HTMLButtonElement>({
        tag: 'button',
        className: 'button',
        id: 'startRace',
        textContent: 'Race',
    });
    const resetRaceButton = createElement<HTMLButtonElement>({
        tag: 'button',
        className: 'button',
        textContent: 'Reset',
        disabled: true,
    });
    const generateBtn = createElement<HTMLButtonElement>({
        tag: 'button',
        className: 'button',
        textContent: 'Generate cars',
        id: 'generateCarsButton',
    });

    generateBtn.addEventListener('click', async () => {
        const promises = [];
        for (let index = 0; index < 100; index += 1) {
            const carPromise = postCar({ name: getRandomName(), color: getRandomColor() });
            promises.push(carPromise);
        }
        Promise.all(promises)
            .then(() => {
                garage.load();
            })
            .catch((error) => {
                console.error('Error while creating cars:', error);
            });
    });

    const winAnnouncement = createElement({ className: 'win-announcement' });
    function handleWinner(e: Event) {
        const car = e.target as ICarElement;
        winAnnouncement.textContent = `${car.carData.name} won with the result ${Math.ceil(car.lastResult / 1000)}sec`;
        document.body.append(winAnnouncement);
        setTimeout(() => {
            winAnnouncement.remove();
        }, 4000);
        sendWinner(car.carData.id, Math.ceil(car.lastResult / 1000));
        garage.cars.forEach((el) => {
            el.removeEventListener(EventActionEnum.FINISHED, handleWinner);
        });
        resetRaceButton.disabled = false;
    }

    startRaceButton.addEventListener('click', () => {
        startRaceButton.disabled = true;
        garage.cars.forEach((car) => {
            const buttons = car.querySelectorAll('button');
            buttons.forEach((btn) => btn.classList.add('btn-disabled'));
            car.addEventListener(EventActionEnum.FINISHED, handleWinner);
            car.dispatchEvent(new Event(EventActionEnum.START));
        });
    });
    resetRaceButton.addEventListener('click', () => {
        resetRaceButton.disabled = true;
        setTimeout(() => {
            startRaceButton.disabled = false;
            const buttons = garage.querySelectorAll('.car-btn');
            buttons.forEach((btn) => {
                btn.removeAttribute('disabled');
                btn.classList.remove('btn-disabled');
            });
        }, 3000);

        garage.cars.forEach((car) => car.dispatchEvent(new Event(EventActionEnum.STOP)));
        winAnnouncement.remove();
    });

    actions.append(generateBtn, startRaceButton, resetRaceButton);
    garagePage.append(formCreate, formUpdate, actions, garage);
    return garagePage;
}
