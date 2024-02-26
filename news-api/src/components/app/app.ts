import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { isHTMLElement } from '../../helpers/helpers';

class App {
    private controller;
    private view;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        document?.querySelector('.sources')?.addEventListener('click', (e) => {
            this.controller.getNews(e, (data) => {
                if ('articles' in data) {
                    this.view.drawNews(data);
                }
            });
        });

        this.controller.getSources((data) => {
            if ('sources' in data) {
                this.view.drawSources(data);
            }
        });
        this.handleScroll();
    }

    private handleScroll(): void {
        const toTopBtn = document.getElementById('toTopBtn');

        window.onscroll = (): void => {
            changeBtnVisibility();
        };

        function changeBtnVisibility(): void {
            if (!isHTMLElement(toTopBtn)) {
                throw new Error('top button does not exist in html template');
            }
            document.documentElement.scrollTop > 100
                ? (toTopBtn.style.display = 'block')
                : (toTopBtn.style.display = 'none');
        }

        document.getElementById('toTopBtn')?.addEventListener('click', () => pageUp());

        function pageUp(): void {
            document.documentElement.scrollTop = 0;
        }
    }
}

export default App;
