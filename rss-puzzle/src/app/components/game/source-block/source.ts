import BaseComponent from '@components/base-component';
import Word from '../word';
import Result from '../result-block/result';

type TCallback = (word: Word) => void;

export default class Source extends BaseComponent {
    protected words: Word[] = [];

    protected callbacks: TCallback[] = [];

    constructor(protected result: Result) {
        super({ className: 'source-block' });
        window.addEventListener('resize', () => {
            // @todo
            Object.values(document.querySelectorAll('.puzzle-background')).map((el) => {
                (el as HTMLElement).style.width = `${this.result.getNode().offsetWidth}px`;
            });
        });
    }

    public addCallback(callback: TCallback) {
        this.callbacks.push(callback);
    }

    public initWords(words: string[]) {
        this.destroyChildren();

        const length = words.reduce((sum, item) => sum + item.length, 0);
        let left = 100;

        // set size
        this.words = words.map((item) => {
            const size = Math.floor((item.length / length) * 100);
            const word = new Word(item, size, this.result.getImage());
            left -= size;
            return word;
        });

        // correct size
        const sortedWords = Object.values(this.words).sort((a, b) => a.getValue().length - b.getValue().length);
        for (let i = 0; i < left; i++) {
            const word = sortedWords[i];
            if (!word) {
                return;
            }
            word.setWidth(word.getWidth() + 1);
        }

        // set background size and position
        left = 0;
        const paddingY = (this.result.getCurrentSentenceNumber() / this.result.getSentencesCount()) * 100;
        this.words.map((word) => {
            word.setPadding(`-${left}%`, `-${paddingY * 10}%`);
            left += word.getWidth();

            word
                .getNode()
                .querySelector('img')
                ?.addEventListener(
                    'load',
                    () => {
                        this.updateWordBackground(word);
                    },
                    { once: true }
                );
        });

        this.render();
    }

    public updateWordBackground(word: Word) {
        const backgroundSize = this.result.getNode().offsetWidth;
        if (!backgroundSize) {
            return;
        }
        word.setBackgroundWidth(`${backgroundSize}px`);
    }

    public getWords() {
        return Object.values(this.words);
    }

    protected render() {
        this.destroyChildren();
        Object.values(this.words)
            .sort(() => 0.5 - Math.random())
            .map((word) => {
                word.addListener('click', () => {
                    const sentence = this.result.getCurrentSentence();
                    if (!sentence) {
                        throw new Error();
                    }
                    if (this.getNode().contains(word.getNode())) {
                        sentence.add(word);
                    } else {
                        this.append(word);
                    }
                    this.callbacks.forEach((callback) => callback(word));
                });
                this.append(word);
            });
    }
}
