import BaseComponent from '@components/base-component';
import Button from '@components/button/button';
import PageComponent from '@pages/page';
import { User } from '@interfaces/interfaces';

import './login.css';

export default class LoginPageComponent extends PageComponent {
    private form: BaseComponent<HTMLFormElement>;

    private inputName = new BaseComponent<HTMLInputElement>({
        className: 'input',
        id: 'inputName',
        tag: 'input',
        type: 'text',
        placeholder: 'Name',
        required: true,
        pattern: '[A-Z][A-Za-z\\-]{2,}',
    });

    private inputNameError = new BaseComponent<HTMLSpanElement>({
        tag: 'span',
        className: 'inputNameError',
    });

    private inputSurnameError = new BaseComponent<HTMLSpanElement>({
        tag: 'span',
        className: 'inputSurnameError',
    });

    private inputSurname = new BaseComponent<HTMLInputElement>({
        className: 'input',
        id: 'inputSurname',
        tag: 'input',
        type: 'text',
        placeholder: 'Surname',
        required: true,
        pattern: '[A-Z][A-Za-z\\-]{3,}',
    });

    private button = new Button({
        className: 'btn disabled',
        textContent: 'Login',
        onclick: () => {
            // console.log('ff');
        },
    });

    constructor() {
        super({ className: 'login-page' });
        this.form = new BaseComponent<HTMLFormElement>(
            { tag: 'form', className: 'form', action: '#', autocomplete: 'off' },
            this.inputName,
            this.inputNameError,
            this.inputSurname,
            this.inputSurnameError,
            this.button
        );

        this.appendChildren([this.form]);
        this.handleKeyUp();
        this.submitListener();
    }

    protected render() {
        this.getNode().textContent = 'Welcome! Login to start learning!';
    }

    protected handleKeyUp() {
        const regexNamePattern: RegExp = /^[A-Z][A-Za-z\\-]{2,}$/;
        this.inputName.addListener('keyup', () => {
            if (regexNamePattern.test(this.inputName.getNode().value)) {
                this.inputName.removeClass('invalid');
                this.inputName.addClass('valid');
                this.inputNameError.setTextContent('');
            } else {
                this.inputName.removeClass('valid');
                this.inputName.addClass('invalid');
                this.inputNameError.setTextContent(
                    'Enter your name, starting with the capital letter, minimum 3 characters'
                );
            }

            if (this.form.getNode().checkValidity()) {
                this.button.removeClass('disabled');
            } else {
                this.button.addClass('disabled');
            }
        });

        const regexSurnamePattern: RegExp = /^[A-Z][A-Za-z\\-]{3,}$/;
        this.inputSurname.addListener('keyup', () => {
            if (regexSurnamePattern.test(this.inputSurname.getNode().value)) {
                this.inputSurname.removeClass('invalid');
                this.inputSurname.addClass('valid');
                this.inputSurnameError.setTextContent('');
            } else {
                this.inputSurname.removeClass('valid');
                this.inputSurname.addClass('invalid');
                this.inputSurnameError.setTextContent(
                    'Enter your surname, starting with the capital letter, minimum 4 characters'
                );
            }

            if (this.form.getNode().checkValidity()) {
                this.button.removeClass('disabled');
            } else {
                this.button.addClass('disabled');
            }
        });
    }

    protected submitListener() {
        this.form.getNode().addEventListener('submit', (e) => {
            e.preventDefault();
            localStorage.setItem(
                'user',
                JSON.stringify({
                    name: this.inputName.getNode().value,
                    surname: this.inputSurname.getNode().value,
                } as User)
            );
        });
    }
}
