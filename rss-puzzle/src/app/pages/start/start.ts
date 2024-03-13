import BaseComponent from '@components/base-component';
import Button from '@components/button/button';
import PageComponent from '@pages/page';

import './start.css';

export default class ModalComponent extends PageComponent {
    // private startCallback: () => void;

    constructor(private callback: () => void) {
        super({ className: 'modal' });
        this.callback = callback;
    }

    protected render() {
        const modalBox = new BaseComponent<HTMLDivElement>(
            { className: 'modal__content' },
            new BaseComponent({ tag: 'h2', className: 'modal__title', textContent: 'English puzzle' }),
            new BaseComponent({
                tag: 'p',
                className: 'modal__greeting',
                textContent: `Greetings, ${this.fetchUserData()}!`,
            }),
            new BaseComponent({
                tag: 'p',
                className: 'modal__description',
                textContent: 'Learn English in an easy and fun way. Build puzzles and improve your language!',
            }),
            new Button({ className: 'button button-start', textContent: 'Start' })
        );

        const button = modalBox.getNode().querySelector('button');
        if (button) {
            button.addEventListener('click', () => {
                // this.closeModal();
                sessionStorage.setItem('started', 'true');
                this.callback();
            });
        }
        this.appendChildren([modalBox]);
        document.body.append(this.getNode());
        // this.getNode().textContent = 'modal page';
    }

    // private closeModal() {
    //     this.destroy();
    // }

    private fetchUserData() {
        const userData = JSON.parse(localStorage.getItem('user')!);
        const name: string = userData.name;
        if (userData) {
            return `${name} ${userData.surname}`;
        }
    }
}
