import BaseComponent, { Props } from '@components/base-component';

import './button.css';

interface ButtonProps extends Omit<Props<HTMLButtonElement>, 'id'> {}

export default class Button extends BaseComponent<HTMLButtonElement> {
    constructor(props: ButtonProps) {
        super({ tag: 'button', ...props });
    }
}
