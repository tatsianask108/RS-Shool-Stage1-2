import BaseComponent from '@components/base-component';

import './modal.css';

export default class ModalComponent extends BaseComponent {
    private readonly modalBox: BaseComponent;

    constructor() {
        super({ className: 'modal' });
        this.modalBox = new BaseComponent(
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
            })
        );

        this.appendChildren([this.modalBox]);
    }

    private fetchUserData() {
        const userData = JSON.parse(localStorage.getItem('user')!);
        const name: string = userData.name;
        if (userData) {
            return `${name} ${userData.surname}`;
        }
    }
}
