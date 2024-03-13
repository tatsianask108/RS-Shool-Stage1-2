// import ModalComponent from '@components/modal/modal';
import { User } from '@interfaces/interfaces';
import PageComponent from '@pages/page';
import Button from '@components/button/button';
import { SVG_LOGOUT } from '@app/constants';

import './game.css';

export default class GamePageComponent extends PageComponent {
    constructor(
        protected userData: User,
        private callback: () => void
    ) {
        super({ className: 'game-page' });
        this.callback = callback;
    }

    protected render(): void {
        this.getNode().textContent = 'game page';
        const button = new Button({
            className: ' button-logout',
            // textContent: 'Logout',
            title: 'Logout',
        }).getNode();
        button.insertAdjacentHTML('beforeend', SVG_LOGOUT);
        button.addEventListener('click', () => {
            localStorage.clear();
            sessionStorage.clear();
            this.callback();
        });
        this.append(button);
    }
}
