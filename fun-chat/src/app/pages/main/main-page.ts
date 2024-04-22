import Page from '@pages/page';
import buttonAbout from '@app/components/button-about';
import footer from '@app/components/footer';
import BaseComponent from '@app/components/base-component';
import ChatService from '@app/services/chat';
import WsService from '@app/services/websocket';

import './main.css';
import Participant, { ParticipantEvents } from '@app/models/participant';

export default class MainPage extends Page {
    protected wsService: WsService;

    public chatService: ChatService;

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

        const userLogin = this.getCurrUserLogin();

        const userName = new BaseComponent({ tag: 'p', textContent: `username: ${userLogin}` });

        header.appendChildren([userName]);
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
        const participants = (await this.chatService.getParticipants())
            .filter((el) => el.login !== this.getCurrUserLogin())
            .map((el) => {
                return this.createParticipantElement(el);
            });

        const main = this.getNode().querySelector('main');
        if (main) {
            userList.getNode().append(...participants);
            main.append(userList.getNode());
        }
    }

    private createParticipantElement(user: Participant) {
        const element = document.createElement('li');
        const status = document.createElement('span');
        const login = document.createElement('span');

        element.id = `user-${user.login}`;
        element.classList.add('line');

        login.textContent = user.login;
        login.className = 'userLogin';

        status.className = user.isLogined ? 'status-online' : 'status-offline';

        element.append(status, login);

        user.on(ParticipantEvents.LOGIN, () => {
            status.className = 'status-online';
        });
        user.on(ParticipantEvents.LOGOUT, () => {
            status.className = 'status-offline';
        });
        return element;
    }
}
