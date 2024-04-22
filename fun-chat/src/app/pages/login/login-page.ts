import BaseComponent from '@app/components/base-component';
import { IUserLoginDto } from '@app/interfaces/interfaces';
import Page from '@pages/page';
import formComponent from '@app/components/login-form';
import buttonAbout from '@app/components/button-about';
import Modal from '@app/components/modal';

import './login-page.css';

export default class LoginPage extends Page {
    constructor() {
        super({ className: 'wrapper' });
    }

    protected render() {
        const loginPage = new BaseComponent(
            { className: 'login-block' },
            new BaseComponent<HTMLParagraphElement>({
                tag: 'p',
                className: 'login-title',
                textContent: 'Enter your name and password',
            }),
            formComponent,
            buttonAbout
        );
        formComponent.addEventListener('keyup', this.handleKeyUp);
        formComponent.addEventListener('submit', (e) => {
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
                    window.location.href = '#/main';
                } else {
                    const modal = new Modal(result.message);
                    modal.open();
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }
}
