import createCar, { ICar } from '../components/car/car';
import createGarageForm from '../components/forms/forms';
import { postCar, getCars } from '../fetch-api';
import { createElement } from '../utils';

const CARS_PER_PAGE = 7;

function renderForms() {
    const formCreate = createGarageForm('Create', 'formCreate');

    formCreate.addEventListener('submit', async (e) => {
        e.preventDefault();

        const response = await postCar(Object.fromEntries(new FormData(formCreate)));
        return response;
    });

    const formUpdate = createGarageForm('Update', 'formUpdate');
    return [formCreate, formUpdate];
}

function renderButtons() {
    return createElement({
        children: [
            createElement({ tag: 'button', className: 'button', text: 'Race' }),
            createElement({ tag: 'button', className: 'button', text: 'Generate cars' }),
        ],
    });
}

function renderCarsContainer(cars: ICar[]) {
    const carsContainer =
        document.getElementById('cars-container') ||
        createElement({
            id: 'cars-container',
            className: 'cars-container',
        });

    carsContainer.innerHTML = '';

    cars.forEach((el: ICar) => {
        const car = createCar(el);
        car.id = el.id.toString();
        carsContainer.append(car);
    });

    return carsContainer;
}

function renderPage(current = 1) {
    let page = current;
    let count = 0;
    const limit = CARS_PER_PAGE;

    const topElement = createElement<HTMLDivElement>({ tag: 'div' });
    const carsCountElement = createElement<HTMLSpanElement>({ tag: 'span' });
    const currentPageElement = createElement<HTMLSpanElement>({ tag: 'span' });

    topElement.append(carsCountElement, currentPageElement);

    function updateGarageState(data: { cars: ICar[]; count: number }) {
        renderCarsContainer(data.cars);
        count = data.count;
        currentPageElement.textContent = `Page#${page}`;
        carsCountElement.textContent = `Garage(${count}) `;
    }

    const containerElement = renderCarsContainer([]);
    const prevButton = createElement<HTMLButtonElement>({ tag: 'button', className: 'button', text: 'prev' });
    const nextButton = createElement<HTMLButtonElement>({ tag: 'button', className: 'button', text: 'next' });

    getCars({ _page: page.toString(), _limit: limit.toString() }).then((data) => {
        updateGarageState(data);
    });

    prevButton.disabled = true;
    prevButton.addEventListener('click', async () => {
        if (page > 1) {
            page -= 1;
            const data = await getCars({ _page: page.toString(), _limit: limit.toString() });
            updateGarageState(data);
            window.scrollTo({ top: topElement.offsetTop });
            nextButton.disabled = false;
        }
        if (page <= 1) {
            prevButton.disabled = true;
        }
    });

    nextButton.addEventListener('click', async () => {
        page += 1;
        const data = await getCars({ _page: page.toString(), _limit: limit.toString() });
        updateGarageState(data);
        window.scrollTo({ top: topElement.offsetTop });

        prevButton.disabled = false;
        if (page * limit >= count) {
            nextButton.disabled = true;
        }
    });

    const element = createElement({ children: [topElement, containerElement, prevButton, nextButton] });
    return element;
}

export default async function renderGarage() {
    const garagePage = createElement({ className: 'garage-page' });
    const forms = renderForms();
    const buttons = renderButtons();
    const page = renderPage();
    garagePage.append(...forms, buttons, page);
    return garagePage;
}
