import { ICar } from '@app/api';
import { createElement } from '@app/utils';

import './car.css';

export const CAR_SVG = `<svg width="120" height="60" viewBox="0 0 140 60" stroke="#000"><switch><g i:extraneous="self"><path d="M77.9,49.2c-3.9,0-7.1,3.2-7.1,7.1c0,3.9,3.2,7.1,7.1,7.1c3.9,0,7.1-3.2,7.1-7.1C85,52.3,81.8,49.2,77.9,49.2z M77.9,60.7    c-2.5,0-4.5-2-4.5-4.5c0-2.5,2-4.5,4.5-4.5c2.5,0,4.5,2,4.5,4.5C82.4,58.7,80.4,60.7,77.9,60.7z"/><path d="M16.4,52.9c-1.8,0-3.3,1.5-3.3,3.3s1.5,3.3,3.3,3.3c1.8,0,3.3-1.5,3.3-3.3S18.3,52.9,16.4,52.9z M16.4,58.8    c-1.4,0-2.5-1.1-2.5-2.5c0-1.4,1.1-2.5,2.5-2.5c1.4,0,2.5,1.1,2.5,2.5C19,57.7,17.8,58.8,16.4,58.8z"/><path d="M77.9,52.9c-1.8,0-3.3,1.5-3.3,3.3s1.5,3.3,3.3,3.3c1.8,0,3.3-1.5,3.3-3.3S79.7,52.9,77.9,52.9z M77.9,58.8    c-1.4,0-2.5-1.1-2.5-2.5c0-1.4,1.1-2.5,2.5-2.5c1.4,0,2.5,1.1,2.5,2.5C80.4,57.7,79.3,58.8,77.9,58.8z"/><path d="M16.4,49.2c-3.9,0-7.1,3.2-7.1,7.1c0,3.9,3.2,7.1,7.1,7.1c3.9,0,7.1-3.2,7.1-7.1C23.5,52.3,20.3,49.2,16.4,49.2z     M16.4,61.2c-2.7,0-4.9-2.2-4.9-4.9c0-2.7,2.2-4.9,4.9-4.9c2.7,0,4.9,2.2,4.9,4.9C21.3,59,19.1,61.2,16.4,61.2z"/><path d="M97,52.8c-0.9-0.7-1.7-1.3-2.6-1.9l0,0l0,0c-2.1-1.5-4.1-2.7-5.9-3.7l0,0h0c-8.4-4.4-14-3.6-17.7-2.5    c-2-2.5-16.4-15.8-62.6-1.5l0,0C5,43.4,3,43.6,3,43.6S2.8,55.9,9,59.9c-0.5-1.1-0.8-2.3-0.8-3.6c0-4.5,3.7-8.2,8.2-8.2    c4.5,0,8.2,3.7,8.2,8.2c0,1.5-0.4,3-1.2,4.2l47.7,0.7c-1-1.4-1.6-3-1.6-4.9c0-4.5,3.7-8.2,8.2-8.2c4.5,0,8.2,3.7,8.2,8.2    c0,1.9-0.6,3.6-1.7,5h9.2c0,0,0.7-0.5,1.7-2.5l0,0l0,0c0.4-0.9,0.8-2.2,1.3-3.9l0,0l0,0C96.7,54.2,96.8,53.5,97,52.8z M4.5,46.7    c-0.4-0.1-1-1.7-0.8-2c0.2-0.3,3.5-0.5,4.5-0.3C9.2,44.5,4.9,46.9,4.5,46.7z M26.4,43.1c4-1.8,7.8-3,11.3-3.8L34,43.8    C31.4,43.5,28.8,43.2,26.4,43.1z M35.3,44c-0.1,0-0.3,0-0.4-0.1l4-4.9c0.2,0,0.4-0.1,0.6-0.1C56,35.8,66,42.4,66.8,46.1    C63.3,46.8,51.4,46.3,35.3,44z M92.3,56.9c-0.3,1-0.9,1.7-1.2,1.6c-0.4-0.1-0.4-1,0-2c0.3-1,0.9-1.7,1.2-1.6    C92.7,55,92.7,55.9,92.3,56.9z M83.4,48c0,0,1.7-1,3.9-0.8c1.8,1,3.8,2.2,5.9,3.7C87.9,51.2,83.4,48,83.4,48z M94.7,58.7    c-1.3-0.6-0.7-3.9-0.7-3.9h2C95.5,56.5,95.1,57.8,94.7,58.7z"/></g></switch></svg>`;

export enum EventActionEnum {
    DELETE = 'delete',
    SELECT = 'select',
    START = 'start',
    STOP = 'stop',
}

export interface ICarElement extends HTMLElement {
    carData: ICar;
}

export default function createCarElement(carData: ICar): ICarElement {
    const carElement = createElement<ICarElement>({
        className: 'car__wrapper',
        carData,
    });

    const selectButton = createElement<HTMLButtonElement>({
        tag: 'button',
        className: 'button',
        textContent: 'Select',
    });
    const deleteButton = createElement<HTMLButtonElement>({
        tag: 'button',
        className: 'button',
        textContent: 'Delete',
    });
    const carName = createElement({ tag: 'span', className: 'car__name', textContent: `${carData.name}` });

    const actionsBlock = createElement({
        className: 'car__upper-block',
        childrenProp: [selectButton, deleteButton, carName],
    });

    deleteButton.addEventListener('click', () => {
        carElement.dispatchEvent(new Event(EventActionEnum.DELETE));
    });

    selectButton.addEventListener('click', () => {
        carElement.dispatchEvent(new Event(EventActionEnum.SELECT));
    });

    const svgContainer = createElement<HTMLDivElement>({
        className: 'svg-container',
        innerHTML: CAR_SVG,
    });
    svgContainer.style.fill = carData.color;
    svgContainer.id = `svg-${carData.id}`;

    const lowerBlock = createElement({
        className: 'car__lower-block',
    });

    const startButton = createElement<HTMLButtonElement>({
        tag: 'button',
        className: 'button',
        id: 'startBtn',
        textContent: 'Start',
    });
    const stopButton = createElement<HTMLButtonElement>({
        tag: 'button',
        className: 'button',
        id: 'stopBtn',
        textContent: 'Stop',
        disabled: true,
    });

    lowerBlock.append(startButton, stopButton, svgContainer);

    startButton.addEventListener('click', () => {
        carElement.dispatchEvent(new Event(EventActionEnum.START));
        // startButton.disabled = true;
        // stopButton.disabled = false;
    });
    stopButton.addEventListener('click', () => {
        carElement.dispatchEvent(new Event(EventActionEnum.STOP));
        // startButton.disabled = false;
        // stopButton.disabled = true;
    });

    carElement.append(actionsBlock, lowerBlock);
    return carElement;
}
