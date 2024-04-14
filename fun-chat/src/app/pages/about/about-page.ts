import BaseComponent from '@app/components/base-component';

import Page from '../page';

export default class AboutPage extends Page {
    constructor() {
        super({ className: 'about' });
    }

    protected render() {
        this.getNode().textContent = 'about';

        const back = new BaseComponent<HTMLButtonElement>({
            tag: 'button',
            className: 'back-btn',
            textContent: 'back',
        });

        back.addListener('click', () => {
            window.location.href = '#/login';
        });

        this.append(back);
    }
}
