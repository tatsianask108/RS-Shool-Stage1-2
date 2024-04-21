import BaseComponent from './base-component';

export default class Modal extends BaseComponent {
    private readonly modalContent: BaseComponent;

    constructor(config: string) {
        super({ className: 'overlay' });
        const btn = new BaseComponent<HTMLButtonElement>({ tag: 'button', textContent: 'Close' });
        btn.addListener('click', this.close.bind(this));
        this.modalContent = new BaseComponent(
            {
                className: 'block-centered',
                textContent: config,
            },
            btn
        );

        this.appendChildren([this.modalContent]);
    }

    public open() {
        document.body.append(this.node);
        setTimeout(() => {
            this.close();
        }, 4000);
    }

    private close() {
        this.destroy();
    }
}
