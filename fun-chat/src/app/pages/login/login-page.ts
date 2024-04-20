import BaseComponent from '@app/components/base-component';
import { IUserLoginDto } from '@app/interfaces/interfaces';
import Page from '@pages/page';
import buttonAbout from '@app/components/button-about';

import './login-page.css';
import Modal from '@app/components/modal';

export default class LoginPage extends Page {
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
                autocomplete: 'username',
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
                type: 'password',
                name: 'password',
                autocomplete: 'current-password',
                className: 'login-form__input',
                placeholder: 'Password',
                pattern: '[A-Za-z0-9]{4,}',
                required: true,
            }),
            new BaseComponent<HTMLSpanElement>({
                tag: 'span',
                className: 'login-form__error',
                data: {
                    errorText: 'Password should contain minimum 4 symbols',
                },
            }),
            new BaseComponent<HTMLButtonElement>({
                tag: 'button',
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
                textContent: 'Enter your name and password',
            }),
            form,
            buttonAbout
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

        const { form } = input;
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

        const loginDto: IUserLoginDto = {
            user: {
                login: form.getElementsByTagName('input')[0].value || '',
                password: form.getElementsByTagName('input')[1].value || '',
            },
        };

        sessionStorage.setItem('user', JSON.stringify(loginDto));
        this.app.authService
            .auth(loginDto)
            .then((result) => {
                if (result.authorized) {
                    // sessionStorage.setItem('user', JSON.stringify(loginDto));
                    window.location.href = '#/main';
                } else {
                    console.log('result', result.message);
                    const modal = new Modal(result.message);
                    modal.open();
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }
}
