import BaseComponent, { Props } from '@components/base-component';

import './button.css';

interface ButtonProps extends Props<HTMLButtonElement> {}

export default class Button extends BaseComponent<HTMLButtonElement> {
    constructor(props: ButtonProps) {
        super({ tag: 'button', ...props });
    }
}
