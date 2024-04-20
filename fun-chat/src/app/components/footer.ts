import BaseComponent from './base-component';

const footer = new BaseComponent(
    {
        className: 'footer',
    },
    new BaseComponent({ tag: 'span', textContent: '2024' }),
    new BaseComponent<HTMLLinkElement>({
        tag: 'a',
        href: 'https://github.com/tatsianask108',
        textContent: 'Tatsiana (github)',
    }),
    new BaseComponent<HTMLLinkElement>({
        tag: 'a',
        href: 'https://rs.school/',
        target: '_blank',
        className: 'footer__rss',
    }),
    new BaseComponent({ tag: 'p', textContent: 'The Rolling Scopes School' })
);

export default footer.getNode();
