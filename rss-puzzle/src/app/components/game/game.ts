import BaseComponent from '@components/base-component';
import SelectComponent from '@components/select/select';
import { ILevel } from '@interfaces/interfaces';
import { LEVELS_COUNT } from '@app/constants';
import Result from './result-block/result';
import Source from './source-block/source';

import './game.css';

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

        const resultBlock = new Result(this.data.rounds[this.round]);

        const currentSentence = resultBlock.getCurrentSentence();
        if (!currentSentence) {
            return;
        }

        const sourceBlock = new Source(resultBlock, () => {
            const sentence = resultBlock.getCurrentSentence();
            if (!sentence) {
                return;
            }
            sentence.showErrors();
            if (sentence.check()) {
                sentence.finish();
                if (resultBlock.nextSentence()) {
                    sourceBlock.setItems(resultBlock.getCurrentSentence()?.getCorrect() || []);
                } else {
                    console.log('round ended');
                }
            }
        });
        sourceBlock.setItems(currentSentence.getCorrect());

        this.appendChildren([...this.createControls(), resultBlock, sourceBlock]);
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
