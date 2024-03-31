import createCarElement, { EventActionEnum, ICarElement } from '../components/car/car';
import createGarageForm from '../components/forms/forms';
import { postCar, getCars, ICar, updateCar, deleteCar, startEngine, drive } from '../fetch-api';
import { animateCar, createElement, getRandomColor, getRandomName } from '../utils';

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
                        await deleteCar(car.id.toString());
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
                        const resp = await startEngine(car.id);
                        const duration = resp.distance / resp.velocity;
                        console.log(duration);
                        const animation = animateCar(el, duration);
                        try {
                            const carStatus = await drive(car.id);
                            console.log(carStatus);
                            if (carStatus === 'engine broke') {
                                cancelAnimationFrame(animation.currentRequestId);
                            }
                        } catch {
                            // cancelAnimationFrame(requestId);
                        }
                    });
                    return el;
                });
                self.cars = carElements;

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

    const generateBtn = createElement<HTMLButtonElement>({
        tag: 'button',
        className: 'button',
        textContent: 'Generate cars',
        id: 'generateCarsButton',
    });
    const actions = createElement({
        childrenProp: [createElement({ tag: 'button', className: 'button', textContent: 'Race' }), generateBtn],
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
                console.error('Error creating cars:', error);
            });
    });

    garagePage.append(formCreate, formUpdate, actions, garage);
    return garagePage;
}
