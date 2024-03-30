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

// function getRandomName() {}
// function getRandomColor() {}
// function createRandomCars() {}
