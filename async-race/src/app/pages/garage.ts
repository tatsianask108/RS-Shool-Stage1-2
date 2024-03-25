import createCar, { ICar } from '../components/car';
import getCars from '../fetch-api';
import { createElement } from '../utils';

// function renderGarage() {}
function renderCars(data: ICar[]) {
    const carsContainer = createElement({ text: `Garage (${data.length}) Page#1`, className: 'cars-container' });
    if (data.length) {
        data.forEach((el) => {
            const car = createCar(el);
            carsContainer.append(car);
        });
    }

    document.body.append(carsContainer);
}

async function render() {
    const cars = await getCars('http://127.0.0.1:3000/garage?_pages=1&_limit=7');
    renderCars(cars);
}

render();
