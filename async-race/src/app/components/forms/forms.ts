import { createElement, createFormElement, createInputElement } from '../../utils';

export default function createForm(buttonText: string, id: string) {
    const textInput = createInputElement({ type: 'text', name: 'text-input' });
    const colorInput = createInputElement({ type: 'color', name: 'color-input', value: '#ff0000' });
    const button = createElement({ tag: 'button', type: 'submit', className: 'button', text: buttonText });
    const form = createFormElement({
        action: '#',
        id,
        children: [textInput, colorInput, button],
    });
    return form;
}
