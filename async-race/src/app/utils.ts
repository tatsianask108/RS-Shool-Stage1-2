export interface IOptions {
    tag?: string;
    text?: string;
    className?: string;
    children?: HTMLElement[];
    innerHTML?: string;
}
export function createElement(options: IOptions) {
    const { tag = 'div', text = '', className = '', children = [], innerHTML = '' } = options;
    const element = document.createElement(tag);
    element.textContent = text;
    if (className) {
        element.classList.add(className);
    }
    if (innerHTML) {
        element.innerHTML = innerHTML;
    }
    element.append(...children);
    return element;
}
