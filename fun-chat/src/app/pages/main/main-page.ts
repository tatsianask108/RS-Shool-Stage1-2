import Page from '@pages/page';
import buttonAbout from '@app/components/button-about';
import footer from '@app/components/footer';
import BaseComponent from '@app/components/base-component';
import ChatService from '@app/services/chat';
import WsService from '@app/services/websocket';

import './main.css';

export default class MainPage extends Page {
    protected wsService: WsService;

    public chatService: ChatService;

    // private main: HTMLElement = document.createElement('main');

    constructor() {
        super({ className: 'container' });
        this.wsService = this.app.getWs();
        this.chatService = new ChatService(this.wsService);
        this.renderUserList();
    }

    protected getCurrUserLogin(): string {
        const user = sessionStorage.getItem('user');
        if (user) {
            const data = JSON.parse(user);
            return data.login;
        }
        return '';
    }

    protected async render() {
        const header = new BaseComponent(
            { tag: 'header', className: 'header' },
            new BaseComponent({ tag: 'h1', textContent: 'Fun Chat' })
        );
        const main = document.createElement('main');

        const buttonLogout = document.createElement('button');

        const userName = this.getCurrUserLogin();

        const userNameP = new BaseComponent({ tag: 'p', textContent: `username: ${userName}` });

        header.appendChildren([userNameP]);
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

    private async renderUserList() {
        const userList = new BaseComponent({ tag: 'ul', className: 'user-list' });
        const activeUsers = await this.chatService.getActiveUsers();
        const unauthorizedUsers = await this.chatService.getUnauthorizedUsers();
        const usersArr: Node[] = [];
        activeUsers
            .filter((user) => user.login !== this.getCurrUserLogin())
            .forEach((user) => {
                const line = document.createElement('li');
                line.classList.add('line');
                const circle = document.createElement('span');
                const userLogin = document.createElement('span');
                userLogin.className = 'userLogin';
                circle.className = 'status-online';
                userLogin.textContent = user.login;
                line.append(circle, userLogin);
                usersArr.push(line);
            });
        unauthorizedUsers.forEach((user) => {
            const line = document.createElement('li');
            line.classList.add('line');
            const circle = document.createElement('span');
            const userLogin = document.createElement('span');
            userLogin.className = 'userLogin';
            circle.className = 'status-offline';
            userLogin.textContent = user.login;
            line.append(circle, userLogin);
            usersArr.push(line);
        });

        const main = this.getNode().querySelector('main');
        if (main) {
            userList.getNode().append(...usersArr);
            main.append(userList.getNode());
        }
    }
}
