import BaseComponent from '@components/base-component';
import Sentence from './sentence';
import { IRound } from '@interfaces/interfaces';

import '../game.css';

export default class Result extends BaseComponent {
    protected currentSentence = 0;

    protected sentences: Sentence[] = [];

    protected image: string;

    constructor(protected round: IRound) {
        super({ className: 'result-block' });

        this.image = round.levelData.imageSrc;
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

    public getSentencesCount() {
        return this.sentences.length;
    }

    public getCurrentSentenceNumber() {
        return this.currentSentence;
    }

    public getImage() {
        return this.image;
    }
}
