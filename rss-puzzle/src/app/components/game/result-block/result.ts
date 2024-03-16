import BaseComponent from '@components/base-component';
import Sentence from './sentence';
import { Round } from '@interfaces/interfaces';

import '../game.css';

export default class Result extends BaseComponent {
    protected currentSentence = 1;

    protected sentences: Sentence[] = [];

    constructor(protected round: Round) {
        super({ className: 'result-block' });
        round.words.forEach((w) => {
            this.sentences.push(new Sentence(w.textExample));
        });
        this.appendChildren(this.sentences);
    }

    public getCurrentSentence(): Sentence | undefined {
        return this.sentences[this.currentSentence];
    }

    public nextSentence(): Sentence | undefined {
        return this.sentences[++this.currentSentence];
    }
}
