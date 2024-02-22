import AppController from '../controller/controller';
import { AppView } from '../view/appView';

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
                console.log('typeof data', typeof data);

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
    }
}

export default App;
