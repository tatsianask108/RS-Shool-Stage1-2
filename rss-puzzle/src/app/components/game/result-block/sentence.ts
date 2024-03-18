import BaseComponent from '@components/base-component';
import Gap from './gap';
import Word from '../word';

import '../game.css';

export default class Sentence extends BaseComponent {
    private correct: string[] = [];

    protected children: Gap[] = [];

    constructor(protected sentence: string) {
        super({ className: 'sentence' });
        this.correct = sentence.split(/(?<!and)\s(?!and)/);
        this.correct.map(() => {
            this.append(new Gap());
        });
    }

    public add(word: Word) {
        if (
            !this.children.some((gap) => {
                if (gap.hasWordNode()) {
                    return false;
                }
                gap.addWord(word);
                return true;
            })
        ) {
            throw new Error();
        }
    }

    public clearGaps() {
        this.children.map((gap) => (gap.getNode().innerHTML = ''));
    }

    public isFilled() {
        return this.children.every((gap) => gap.hasWordNode());
    }

    public isCorrect(): boolean {
        return this.correct.every((value, index) => {
            const word = this.children[index]?.getWordNode();
            return !!word && word.textContent === value;
        });
    }

    public finish() {
        setTimeout(() => {
            const clonedElement = this.getNode().cloneNode(true) as HTMLElement;
            clonedElement.classList.add('solved');
            this.getNode().parentNode?.replaceChild(clonedElement, this.getNode());
        });
    }

    public showErrors() {
        document.addEventListener(
            'pointerdown',
            () => {
                this.children.map((word) => word.removeClass('error'));
            },
            { once: true }
        );
        return this.children.map((gap, index) => {
            const wordNode = gap.getWordNode();

            if (wordNode && this.correct[index] !== wordNode.textContent) {
                gap.addClass('error');
            } else {
                gap.removeClass('error');
            }
        });
    }

    public getCorrect() {
        return Object.values(this.correct);
    }
}
