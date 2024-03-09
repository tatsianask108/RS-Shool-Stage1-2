import BaseComponent, { Props } from '@components/base-component';

// import styles from './button.module.css';
import './button.css';

interface ButtonProps extends Props {
    onClick?: () => void;
}

export default class Button extends BaseComponent {
    private onClick;

    constructor({ className, textContent, onClick }: ButtonProps) {
        super({ tag: 'button', className, textContent });
        if (onClick) {
            this.onClick = onClick;
            this.addListener('click', this.onClick);
        }
    }
}

// const button = new Button({
//     className: 'btn',
//     textContent: 'Login',
//     onclick: (e) => {
//         e.preventDefault();
//     },
// });
