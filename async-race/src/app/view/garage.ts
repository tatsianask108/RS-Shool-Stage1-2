import createCar, { ICar } from '../components/car/car';
import createForm from '../components/forms/forms';
import { fetchCar, getCars } from '../fetch-api';
import { createElement } from '../utils';

function renderForms() {
    const formCreate = createForm('Create', 'formCreate');
    const formUpdate = createForm('Update', 'formUpdate');
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

function renderCars(data: ICar[]) {
    const carsContainer = createElement({ text: `Garage (${data.length}) Page#1`, className: 'cars-container' });
    if (data.length) {
        data.forEach((el) => {
            const car = createCar(el);
            car.id = el.id.toString();
            carsContainer.append(car);
        });
    }

    return carsContainer;
}

export default async function renderGarage() {
    const garagePage = createElement({ className: 'garage-page' });
    const forms = renderForms();
    const buttons = renderButtons();
    const carData = await getCars('http://127.0.0.1:3000/garage?_pages=1&_limit=7');
    const cars = renderCars(carData);
    garagePage.append(...forms, buttons, cars);
    return garagePage;
}

const formCreate = document.getElementById('formCreate') as HTMLFormElement;
formCreate?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const response = await fetchCar();
    console.log(response);
});
