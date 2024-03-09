import BaseComponent, { Props } from '@components/base-component';

export default abstract class PageComponent extends BaseComponent {
    constructor(props: Props) {
        super(props);
        this.render();
    }
    protected abstract render(): void;
}
