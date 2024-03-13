import PageComponent from '@pages/page';
import LoginPageComponent from '@pages/login/login';

import { User } from '@interfaces/interfaces';
import GamePageComponent from '@pages/game/game';
import StartPageComponent from '@pages/start/start';

export class App {
    protected user: User | undefined;

    protected page: PageComponent | undefined;

    constructor(private root: HTMLElement) {}

    public init() {
        if (this.isAuth() && this.isStarted()) {
            this.render(new GamePageComponent(this.user as User));
        } else {
            if (this.isAuth()) {
                this.render(
                    new StartPageComponent(() => {
                        this.init();
                    })
                );
            } else {
                this.render(
                    new LoginPageComponent(() => {
                        this.init();
                    })
                );
            }
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
        if (userData) {
            this.user = JSON.parse(userData);
            return true;
        } else {
            return false;
        }
    }

    protected isStarted(): boolean {
        return Boolean(sessionStorage.getItem('started'));
    }
}

const app = new App(document.body);
app.init();
