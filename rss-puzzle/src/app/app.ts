import PageComponent from '@pages/page';
import LoginPageComponent from '@pages/login-page/login-page';

import { IUser } from '@interfaces/interfaces';
import GamePageComponent from '@pages/game-page/game-page';
import StartPageComponent from '@pages/start-page/start-page';

export class App {
    protected user: IUser | undefined;

    protected page: PageComponent | undefined;

    constructor(private root: HTMLElement) {}

    public init() {
        document.addEventListener(
            'auth',
            () => {
                this.init();
            },
            { once: true }
        );
        if (this.isAuth() && this.isStarted()) {
            this.render(new GamePageComponent(this.user as IUser));
        } else {
            if (this.isAuth()) {
                this.render(new StartPageComponent());
            } else {
                this.render(new LoginPageComponent());
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
