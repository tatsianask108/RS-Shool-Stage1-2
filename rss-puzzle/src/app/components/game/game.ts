import BaseComponent from '@components/base-component';
import SelectComponent from '@components/select/select';
import { ILevel } from '@interfaces/interfaces';
import { LEVELS_COUNT } from '@app/constants';
import Result from './result-block/result';
import Source from './source-block/source';

import './game.css';
import Button from '@components/button/button';

export default class Game extends BaseComponent {
    protected LEVEL_COUNT = LEVELS_COUNT;

    protected URL_TEMPLATE =
        '//raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel%lvl%.json';

    protected level: number = 1;

    protected round: number = 0;

    protected data: ILevel = {
        rounds: [],
    };

    constructor() {
        super({ className: 'game-container' });
        this.loadProgress();
        this.fetchLevel();
    }

    protected loadProgress() {
        this.level = parseInt(localStorage.getItem('last-level') || '') || 1;
        this.round = parseInt(localStorage.getItem('last-round') || '') || 0;
    }

    protected saveProgress() {
        localStorage.setItem('last-level', this.level.toString());
        localStorage.setItem('last-round', this.round.toString());
    }

    protected renderRound() {
        this.saveProgress();
        this.destroyChildren();

        const round = this.data.rounds[this.round];

        const resultBlock = new Result(round);

        const currentSentence = resultBlock.getCurrentSentence();
        if (!currentSentence) {
            return;
        }

        const sourceBlock = new Source(resultBlock);
        sourceBlock.initWords(currentSentence.getCorrect());

        const solutionButton = new Button({
            className: 'button',
            id: 'solutionButton',
            textContent: 'Show solution',
        });

        const checkButton = new Button({
            className: 'button',
            id: 'checkButton',
            textContent: 'Check',
            disabled: true,
        });

        const continueButton = new Button({
            className: 'button',
            id: 'continueButton',
            textContent: 'Continue',
        });
        continueButton.hide();

        checkButton.addListener('click', () => {
            resultBlock.getCurrentSentence()?.showErrors();
        });
        continueButton.addListener('click', () => {
            if (resultBlock.nextSentence()) {
                sourceBlock.initWords(resultBlock.getCurrentSentence()?.getCorrect() as string[]);
                continueButton.hide();
                checkButton.show();
            } else {
                if (this.data.rounds[this.round + 1]) {
                    this.round++;
                    this.renderRound();
                } else if (this.level + 1 <= this.LEVEL_COUNT) {
                    this.round = 0;
                    this.level++;
                    this.fetchLevel();
                } else {
                    this.round = 0;
                    this.level = 1;
                    this.fetchLevel();
                }
            }
        });

        sourceBlock.addCallback(() => {
            const sentence = resultBlock.getCurrentSentence();
            if (!sentence) {
                return;
            }

            if (sentence.isFilled()) {
                if (sentence.isCorrect()) {
                    sentence.finish();
                    checkButton.hide();
                    continueButton.show();
                } else {
                    checkButton.enable();
                }
            } else {
                checkButton.disable();
            }
        });

        solutionButton.addListener('click', () => {
            const sentence = resultBlock.getCurrentSentence();
            if (!sentence) {
                throw new Error();
            }

            sentence.clearGaps();
            sourceBlock.getWords().map((word) => {
                sentence.add(word);
            });
            sentence.finish();

            continueButton.show();
            checkButton.hide();
        });

        this.appendChildren([
            ...this.createControls(),
            resultBlock,
            sourceBlock,
            solutionButton,
            checkButton,
            continueButton,
        ]);
    }

    protected createControls(): SelectComponent[] {
        const levelComponent = new SelectComponent(
            {},
            Array.from(Array(this.LEVEL_COUNT).keys(), (index) => {
                const level = index + 1;
                return { value: level.toString(), textContent: `Level ${level}`, selected: level === this.level };
            })
        );
        levelComponent.addListener('change', () => {
            this.level = parseInt(levelComponent.getNode().value);
            this.fetchLevel();
        });

        const roundsComponent = new SelectComponent(
            {},
            this.data.rounds.map((_, index) => {
                const round = index + 1;
                return {
                    value: index.toString(),
                    textContent: `Round ${round}`,
                    selected: index === this.round,
                };
            })
        );
        roundsComponent.addListener('change', () => {
            this.round = +roundsComponent.getNode().value;
            this.renderRound();
        });

        return [levelComponent, roundsComponent];
    }

    protected fetchLevel() {
        fetch(this.URL_TEMPLATE.replace('%lvl%', this.level.toString())).then(async (res) => {
            this.data = await res.json();
            console.log(this.data);
            this.renderRound();
        });
    }
}
