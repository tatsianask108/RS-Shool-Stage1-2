import BaseComponent from './base-component';

const buttonAbout = new BaseComponent<HTMLButtonElement>({
    tag: 'button',
    className: 'about-btn',
    textContent: 'About',
});

buttonAbout.addListener('click', () => {
    window.location.href = '#/about';
});

export default buttonAbout.getNode();
