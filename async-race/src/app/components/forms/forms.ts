import { createElement } from '@app/utils';

export default function createGarageForm(buttonText: string) {
    const idInput = createElement<HTMLInputElement>({ tag: 'input', type: 'hidden', name: 'id' });
    const nameInput = createElement<HTMLInputElement>({ tag: 'input', type: 'text', name: 'name', required: true });
    const colorInput = createElement<HTMLInputElement>({ tag: 'input', type: 'color', name: 'color', value: '#000' });

    const button = createElement<HTMLButtonElement>({
        tag: 'button',
        type: 'submit',
        className: 'button',
        textContent: buttonText,
    });

    const form = createElement<HTMLFormElement>({
        tag: 'form',
        action: '#',
        childrenProp: [idInput, nameInput, colorInput, button],
    });
    return form;
}
