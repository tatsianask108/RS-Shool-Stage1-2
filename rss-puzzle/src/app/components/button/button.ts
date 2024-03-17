import BaseComponent, { Props } from '@components/base-component';

import './button.css';

interface ButtonProps extends Props<HTMLButtonElement> {}

export default class Button extends BaseComponent<HTMLButtonElement> {
    constructor(props: ButtonProps) {
        super({ tag: 'button', ...props });
    }

    public show() {
        this.node.style.display = '';
    }

    public hide() {
        this.node.style.display = 'none';
    }

    public enable() {
        this.node.removeAttribute('disabled');
    }

    public disable() {
        this.node.setAttribute('disabled', '');
    }
}
