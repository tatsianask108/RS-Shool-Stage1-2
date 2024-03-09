import BaseComponent from '@components/base-component';
import Button from '@components/button/button';
import PageComponent from '@pages/page';

import './login.css';

export default class LoginPageComponent extends PageComponent {
    private form: BaseComponent<HTMLFormElement>;

    private inputName = new BaseComponent<HTMLInputElement>({
        className: 'input',
        tag: 'input',
        type: 'text',
        placeholder: 'Name',
        required: true,
    });

    private inputSurname = new BaseComponent<HTMLInputElement>({
        className: 'input',
        tag: 'input',
        type: 'text',
        placeholder: 'Surname',
        required: true,
    });

    private button = new Button({
        className: 'btn',
        textContent: 'Login',
        onclick: (e) => {
            e.preventDefault();
        },
    });

    constructor() {
        super({ className: 'login-page' });
        this.form = new BaseComponent<HTMLFormElement>(
            { tag: 'form', className: 'form', action: '#' },
            this.inputName,
            this.inputSurname,
            this.button
        );

        this.appendChildren([this.form]);
        // this.changeListener();
    }

    protected render() {
        this.getNode().textContent = 'Welcome! Login to start learning!';
    }

    // protected check() {
    //     if (this.form.getNode().checkValidity()) {
    //         this.button.removeClass('disabled');
    //     }
    // }

    // protected changeListener() {
    //     this.form.getNode().addEventListener('change', this.check);
    // }
}
