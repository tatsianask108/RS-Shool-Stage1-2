import { SVG_LOGOUT } from '@app/constants';
import BaseComponent from '@components/base-component';
import Button from '@components/button/button';

import './header.css';

export default class HeaderComponent extends BaseComponent {
    constructor() {
        const h1 = new BaseComponent<HTMLHeadElement>({ tag: 'h1', className: 'title', textContent: 'RSS-Puzzle' });
        const logout = new Button({
            className: ' button-logout',
            title: 'Logout',
        }).getNode();
        logout.insertAdjacentHTML('beforeend', SVG_LOGOUT);
        logout.addEventListener('click', () => {
            localStorage.clear();
            sessionStorage.clear();
            document.dispatchEvent(new Event('auth'));
        });

        super({ tag: 'header', className: 'header' }, h1, logout);
    }
}
