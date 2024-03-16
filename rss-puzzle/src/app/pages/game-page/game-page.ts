import { User } from '@interfaces/interfaces';
import PageComponent from '@pages/page';
import HeaderComponent from '@components/header/header';
import Game from '@components/game/game';

import './game-page.css';

export default class GamePageComponent extends PageComponent {
    constructor(protected userData: User) {
        super({ className: 'game-page' });
    }

    protected render(): void {
        this.append(new HeaderComponent());
        this.append(new Game());
    }
}
