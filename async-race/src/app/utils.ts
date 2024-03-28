interface IOptions {
    tag?: string;
    text?: string;
    className?: string;
    children?: HTMLElement[];
    innerHTML?: string;
    type?: string;
    value?: string;
    name?: string;
    action?: string;
    method?: string;
    id?: string;
}
export function createElement(options: IOptions) {
    const { tag = 'div', text = '', className = '', children = [], innerHTML = '', id = '' } = options;
    const element = document.createElement(tag);
    element.textContent = text;
    if (className) {
        element.className = className;
    }

    if (innerHTML) {
        element.innerHTML = innerHTML;
    }

    if (id) {
        element.id = id;
    }

    element.append(...children);
    return element;
}

export function createFormElement(options: IOptions) {
    const { tag = 'form', children = [], action = '', id = '' } = options;
    const element = document.createElement(tag) as HTMLFormElement;
    element.action = action;
    element.id = id;
    element.append(...children);
    return element;
}

export function createInputElement(options: IOptions) {
    const { tag = 'input', type = '', value = '', name = '' } = options;
    const element = document.createElement(tag) as HTMLInputElement;
    element.type = type;
    element.value = value;
    element.name = name;
    return element;
}

// function getRandomName() {}
// function getRandomColor() {}
// function createRandomCars() {}
