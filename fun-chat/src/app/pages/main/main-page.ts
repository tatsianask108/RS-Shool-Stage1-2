import Page from '@pages/page';
import buttonAbout from '@app/components/button-about';
import footer from '@app/components/footer';
import BaseComponent from '@app/components/base-component';

import './main.css';

export default class MainPage extends Page {
    constructor() {
        super({ className: 'container' });
    }

    protected render() {
        const header = new BaseComponent(
            { tag: 'header', className: 'header' },
            new BaseComponent({ tag: 'h1', textContent: 'Fun Chat' })
        );
        const main = document.createElement('main');
        const buttonLogout = document.createElement('button');

        const user = sessionStorage.getItem('user');
        if (user) {
            const data = JSON.parse(user);
            const name = data.login;
            const userName = new BaseComponent({ tag: 'p', textContent: `username: ${name}` });
            header.appendChildren([userName]);
            // header.getNode().textContent = `username: ${name}`;
        }
        buttonLogout.textContent = 'Logout';

        buttonLogout.addEventListener('click', async () => {
            await this.app.authService.logout();
            window.location.href = '#/';
        });

        const buttons = document.createElement('div');
        buttons.append(buttonLogout, buttonAbout);
        header.appendChildren([buttons]);
        this.appendChildren([header, main, footer]);
    }
}
