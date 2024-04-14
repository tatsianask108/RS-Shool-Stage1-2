import App from '@app/app';
import BaseComponent, { Props } from '@app/components/base-component';

export default abstract class Page extends BaseComponent {
    protected app: App;

    constructor(props: Props) {
        super(props);
        this.app = App.getInstance();
        this.render();
    }
    protected abstract render(): void;
}
