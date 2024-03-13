import PageComponent from '@pages/page';
import LoginPageComponent from '@pages/login/login';

import { User } from '@interfaces/interfaces';
import GamePageComponent from '@pages/game/game';

export class App {
    protected user: User | undefined;

    protected page: PageComponent | undefined;

    constructor(private root: HTMLElement) {}

    public init() {
        if (this.isAuth()) {
            this.render(new GamePageComponent(this.user as User));
        } else {
            this.render(
                new LoginPageComponent(() => {
                    this.init();
                })
            );
        }
    }

    protected render(page: PageComponent) {
        if (this.page) {
            this.page.destroy();
        }
        this.page = page;
        this.root.append(page.getNode());
    }

    protected isAuth(): boolean {
        const userData = localStorage.getItem('user');
        try {
            this.user = JSON.parse(userData ?? '');
            return true;
        } catch {
            return false;
        }
    }
}

const app = new App(document.body);
app.init();
