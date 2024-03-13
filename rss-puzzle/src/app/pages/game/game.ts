import ModalComponent from '@components/modal/modal';
import { User } from '@interfaces/interfaces';
import PageComponent from '@pages/page';

import './game.css';

export default class GamePageComponent extends PageComponent {
    constructor(protected userData: User) {
        super({ className: 'game-page' });
    }

    protected render(): void {
        document.body.append(new ModalComponent().getNode());
    }
}
