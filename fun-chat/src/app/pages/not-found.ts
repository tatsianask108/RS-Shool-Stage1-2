import Page from './page';

export default class NotFoundPage extends Page {
    constructor() {
        super({ className: 'wrapper' });
    }

    protected render() {
        const page = document.createElement('div');
        page.classList.add('not-found');
        page.textContent = '404';
        this.append(page);
    }
}
