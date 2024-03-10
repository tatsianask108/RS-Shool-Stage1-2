import PageComponent from '@pages/page';
// import BaseComponent from '@components/base-component';
import LoginPageComponent from '@pages/login/login';

import { User } from '@interfaces/interfaces';

export class App {
    protected user: User | undefined;

    protected page: PageComponent | undefined;

    constructor(private root: HTMLElement) {}

    public init() {
        this.render(new LoginPageComponent());
    }

    protected render(page: PageComponent) {
        if (this.page) {
            this.page.destroy();
        }
        this.page = page;
        this.root.append(page.getNode());
    }
}

const app = new App(document.body);
app.init();
