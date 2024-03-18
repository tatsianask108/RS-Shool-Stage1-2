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
        this.startLevel(this.level.toString());
    }

    protected render() {
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
                console.log('round ended');
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
            this.startLevel(levelComponent.getNode().value);
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
            this.render();
        });

        return [levelComponent, roundsComponent];
    }

    protected startLevel(level: string) {
        this.level = parseInt(level);
        this.round = 0;
        fetch(this.URL_TEMPLATE.replace('%lvl%', level)).then(async (res) => {
            this.data = await res.json();
            console.log(this.data);
            this.render();
        });
    }
}
