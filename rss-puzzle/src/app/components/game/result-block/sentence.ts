import BaseComponent from '@components/base-component';
import '../game.css';

export default class Sentence extends BaseComponent {
    protected userAnswers: string[] = [];

    public correct: string[] = [];

    constructor(protected sentence: string) {
        super({ className: 'sentence' });
        this.correct = sentence.split(' ');
    }

    public add(word: string) {
        this.userAnswers.push(word);
        this.append(new BaseComponent<HTMLSpanElement>({ tag: 'span', className: 'puzzle', textContent: word }));
    }

    public remove(index: number) {
        delete this.userAnswers[index];

        this.children[index]?.destroy();
        delete this.children[index];
    }

    public check(): boolean {
        return this.correct.every((value, index) => {
            return this.userAnswers[index] === value;
        });
    }

    public showErrors() {}

    public getCorrect() {
        console.log('prop. correct', this.correct);
        console.log('Object.values', Object.values(this.correct));
        return Object.values(this.correct);
    }
}
