import BaseComponent from '@components/base-component';
import Button from '@components/button/button';
import PageComponent from '@pages/page';
import { IUser } from '@interfaces/interfaces';

import './login-page.css';

export default class LoginPageComponent extends PageComponent {
    constructor() {
        super({ className: 'wrapper' });
    }

    protected render() {
        const form = new BaseComponent<HTMLFormElement>(
            { tag: 'form', className: 'login-form', action: '#', autocomplete: 'off' },
            new BaseComponent<HTMLInputElement>({
                tag: 'input',
                type: 'text',
                name: 'name',
                className: 'login-form__input',
                placeholder: 'Name',
                pattern: '[A-Z][A-Za-z\\-]{2,}',
                required: true,
            }),
            new BaseComponent<HTMLSpanElement>({
                tag: 'span',
                className: 'login-form__error',
                data: {
                    errorText: 'Enter your name starting with the capital letter, minimum 3 characters',
                },
            }),
            new BaseComponent<HTMLInputElement>({
                tag: 'input',
                type: 'text',
                name: 'surname',
                className: 'login-form__input',
                placeholder: 'Surname',
                pattern: '[A-Z][A-Za-z\\-]{3,}',
                required: true,
            }),
            new BaseComponent<HTMLSpanElement>({
                tag: 'span',
                className: 'login-form__error',
                data: {
                    errorText: 'Enter your name starting with the capital letter, minimum 4 characters',
                },
            }),
            new Button({
                className: 'button',
                textContent: 'Login',
                disabled: true,
            })
        );

        const loginPage = new BaseComponent(
            { className: 'login-block' },
            new BaseComponent<HTMLParagraphElement>({
                tag: 'p',
                className: 'login-title',
                textContent: 'Welcome! Login to start learning!',
            }),
            form
        );
        form.getNode().addEventListener('keyup', this.handleKeyUp);
        form.getNode().addEventListener('submit', (e) => {
            this.handleSubmit(e);
        });
        this.appendChildren([loginPage]);
    }

    protected handleKeyUp(e: Event) {
        const input = e.target as HTMLInputElement;
        if (!input || !input.form) {
            return;
        }

        const form = input.form;
        if (!input.checkValidity()) {
            input.classList.remove('valid');
            input.classList.add('invalid');
        } else {
            input.classList.remove('invalid');
            input.classList.add('valid');
        }

        const button = form.querySelector('button');
        if (!form.checkValidity()) {
            button?.setAttribute('disabled', 'disabled');
        } else {
            button?.removeAttribute('disabled');
        }
    }

    protected handleSubmit(e: Event) {
        const form = e.target as HTMLFormElement;
        if (!form) {
            return;
        }
        e.preventDefault();

        const userData: IUser = {
            name: form.getElementsByTagName('input')[0].value || '',
            surname: form.getElementsByTagName('input')[1].value || '',
        };

        localStorage.setItem('user', JSON.stringify(userData));
        document.dispatchEvent(new Event('auth'));
    }
}
