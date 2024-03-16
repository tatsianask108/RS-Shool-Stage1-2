import BaseComponent from '@components/base-component';

export default class Source extends BaseComponent {
    constructor(
        protected words: string[],
        protected callback: (word: string) => void
    ) {
        super({ className: 'source-block' });
        this.setItems(words);
    }

    public setItems(words: string[]) {
        this.words = words.sort(() => 0.5 - Math.random());
        this.render();
    }

    protected render() {
        this.destroyChildren();
        this.words.map((word) => {
            const span = new BaseComponent<HTMLSpanElement>({ tag: 'span', className: 'puzzle', textContent: word });
            span.getNode().addEventListener('click', () => {
                this.callback(word);
                span.destroy();
            });
            this.append(span);
        });
    }
}
