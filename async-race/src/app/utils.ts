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
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`.toUpperCase();
    return randomColor;
}
