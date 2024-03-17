import BaseComponent from '@components/base-component';
import Word from '../word';
import Result from '../result-block/result';

export default class Source extends BaseComponent {
    protected words: Word[] = [];

    constructor(
        protected result: Result,
        protected wordCallback: (word: Word) => void
    ) {
        super({ className: 'source-block' });
    }

    public setItems(words: string[]) {
        this.words = words.sort(() => 0.5 - Math.random()).map((word) => new Word(word));
        this.render();
    }

    protected render() {
        this.destroyChildren();
        this.words.map((word) => {
            word.addListener('click', () => {
                const sentence = this.result.getCurrentSentence();
                if (!sentence) {
                    throw new Error();
                }
                if (this.getNode().contains(word.getNode())) {
                    sentence.add(word);
                } else {
                    sentence.remove(word);
                    this.append(word);
                }
                this.wordCallback(word);
            });
            this.append(word);
        });
    }
}
