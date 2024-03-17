import BaseComponent from '@components/base-component';
import Word from '../word';

import '../game.css';

export default class Sentence extends BaseComponent {
    private correct: string[] = [];

    protected children: Word[] = [];

    constructor(protected sentence: string) {
        super({ className: 'sentence' });
        this.correct = sentence.split(' ');
    }

    public add(word: Word) {
        this.append(word);
    }

    public remove(word: Word) {
        const index = this.children.indexOf(word);
        if (index !== -1) {
            this.children.splice(index, 1);
        }
    }

    public checkLength() {
        return this.children.length === this.correct.length;
    }

    public check(): boolean {
        return this.correct.every((value, index) => {
            const word = this.children[index]?.getValue();
            return word === value;
        });
    }

    public finish() {
        const clonedElement = this.getNode().cloneNode(true) as HTMLElement;
        clonedElement.classList.add('solved-sentence');
        this.getNode().parentNode?.replaceChild(clonedElement, this.getNode());
    }

    public showErrors() {
        document.addEventListener(
            'pointerdown',
            () => {
                this.children.map((word) => word.removeClass('error'));
            },
            { once: true }
        );
        return this.children.map((word, index) => {
            if (this.correct[index] !== word.getValue()) {
                word.addClass('error');
            } else {
                word.removeClass('error');
            }
        });
    }

    public getCorrect() {
        return Object.values(this.correct);
    }
}
