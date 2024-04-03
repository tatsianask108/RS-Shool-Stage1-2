import { ICarElement } from './components/car/car';

const COLORS_UPPER_LIMIT = 16777215;
const CAR_WIDTH = 100;

export type IElementProps<T extends HTMLElement = HTMLElement> = Partial<T> & {
    tag?: keyof HTMLElementTagNameMap;
    childrenProp?: HTMLElement[];
};

export function createElement<T extends HTMLElement = HTMLElement>(props: IElementProps<T>): T {
    const element = document.createElement(props.tag ?? 'div');
    Object.assign(element, props);

    if (props.childrenProp) {
        element.append(...props.childrenProp);
    }

    return element as T;
}

const carNamesList = ['Ford', 'Audi', 'Nissan', 'Peugeot', 'Tesla', 'Subaru', 'Toyota', 'BMW', 'Honda', 'Volvo'];
const carModelsList = ['T20', 'A6', 'Focus', 'A6', 'X5', '5008', 'Accent', 'Civic', 'X Trail', 'XC40'];

export function getRandomName() {
    const randomName = carNamesList[Math.floor(Math.random() * carNamesList.length)];
    const randomModel = carModelsList[Math.floor(Math.random() * carModelsList.length)];
    return `${randomName} ${randomModel}`;
}

export function getRandomColor() {
    const randomColor = `#${Math.floor(Math.random() * COLORS_UPPER_LIMIT).toString(16)}`.toUpperCase();
    return randomColor;
}

export function animateCar(carContainer: ICarElement, carSVG: HTMLElement, duration: number) {
    const animationObject = {
        currentRequestId: 0,
    };

    const timeStart = performance.now();
    const carWidth = CAR_WIDTH;
    const distance = carContainer.offsetWidth - carWidth - carWidth;

    function start(movingDuration: number) {
        const time = performance.now();
        let timeFraction = (time - timeStart) / movingDuration;
        if (timeFraction > 1) {
            timeFraction = 1;
        }
        // eslint-disable-next-line no-param-reassign
        carSVG.style.left = `${CAR_WIDTH + timeFraction * distance}px`;
        if (timeFraction < 1) {
            animationObject.currentRequestId = requestAnimationFrame(() => start(movingDuration));
        }
    }
    start(duration);

    return animationObject;
}
