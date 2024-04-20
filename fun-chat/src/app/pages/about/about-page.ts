import BaseComponent from '@app/components/base-component';

import Page from '../page';

export default class AboutPage extends Page {
    constructor() {
        super({ className: 'wrapper' });
    }

    protected render() {
        const content = new BaseComponent({ className: 'block-centered' });
        const ghLink = new BaseComponent<HTMLLinkElement>({
            tag: 'a',
            href: 'https://github.com/tatsianask108',
            textContent: 'Tatsiana (github)',
        });
        const p = new BaseComponent({
            tag: 'p',
            textContent: `This application was created while participating in the Rolling Scopes School course`,
        });

        const back = new BaseComponent<HTMLButtonElement>({
            tag: 'button',
            className: 'back-btn',
            textContent: 'back',
        });

        back.addListener('click', () => {
            window.location.href = '#/login';
        });

        content.appendChildren([p, ghLink, back]);
        this.append(content);

        // this.getNode().textContent = 'about';
    }
}
