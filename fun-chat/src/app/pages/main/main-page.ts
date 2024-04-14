import Page from '@pages/page';

export default class MainPage extends Page {
    constructor() {
        super({ className: 'wrapper' });
    }

    protected render() {
        const page = document.createElement('div');
        const buttonLogout = document.createElement('button');

        page.textContent = 'main';
        buttonLogout.textContent = 'logout';

        buttonLogout.addEventListener('click', async () => {
            await this.app.authService.logout();
            window.location.href = '#/';
        });
        page.append(buttonLogout);
        this.append(page);
    }
}
