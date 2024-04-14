import Page from '@pages/page';
import buttonAbout from '@app/components/button-about';

export default class MainPage extends Page {
    constructor() {
        super({ className: 'wrapper' });
    }

    protected render() {
        const page = document.createElement('div');
        const buttonLogout = document.createElement('button');

        const user = sessionStorage.getItem('user');
        if (user) {
            const data = JSON.parse(user);
            const name = data.login;
            page.textContent = `username: ${name}`;
        }
        buttonLogout.textContent = 'logout';

        buttonLogout.addEventListener('click', async () => {
            await this.app.authService.logout();
            window.location.href = '#/';
        });
        page.append(buttonLogout, buttonAbout);
        this.append(page);
    }
}
