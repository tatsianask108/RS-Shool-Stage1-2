import { User } from '@interfaces/interfaces';
import PageComponent from '@pages/page';

export default class GamePageComponent extends PageComponent {
    constructor(protected userData: User) {
        super({ className: 'game-page' });
    }

    protected render(): void {
        this.getNode().textContent =
            'RSS Puzzle game - learn English in an easy and fun way. Build puzzles and improve your language!';
    }
}
