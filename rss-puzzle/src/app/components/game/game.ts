import BaseComponent from '@components/base-component';
import SelectComponent from '@components/select/select';
import { Level } from '@interfaces/interfaces';
import { LEVELS_COUNT } from '@app/constants';

import './game.css';

export default class Game extends BaseComponent {
    protected LEVEL_COUNT = LEVELS_COUNT;

    protected URL_TEMPLATE =
        '//raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel%lvl%.json';

    protected level: number | undefined;

    protected round: number | undefined;

    protected data: Level = {
        rounds: [
            {
                levelData: {
                    id: '1_01',
                    cutSrc: 'level1/cut/deerhunt.jpg',
                    author: "Niccolò dell'",
                },
                words: [
                    {
                        audioExample: 'files/01_0001_example.mp3',
                        textExample: 'The students agree they have too much homework',
                        id: 1,
                    },
                ],
            },
        ],
    };

    constructor() {
        super({ className: 'game-container' });
        this.startLevel('1');
    }

    protected render() {
        this.destroyChildren();

        const levelComponent = new SelectComponent(
            {},
            Array.from(Array(this.LEVEL_COUNT).keys(), (index) => {
                const level = index + 1;
                return { value: level.toString(), textContent: `Level ${level}`, selected: level === this.level };
            })
        );
        levelComponent.getNode().addEventListener('change', () => {
            this.startLevel(levelComponent.getNode().value);
        });

        const roundsComponent = new SelectComponent(
            {},
            this.data.rounds.map((_, index) => {
                const round = index + 1;
                return {
                    value: round.toString(),
                    textContent: `Round ${round}`,
                    selected: round === this.round,
                };
            })
        );
        roundsComponent.getNode().addEventListener('change', () => {
            this.round = +roundsComponent.getNode().value;
            this.render();
        });

        this.appendChildren([levelComponent, roundsComponent]);
    }

    protected startLevel(level: string) {
        this.level = parseInt(level);
        this.round = 1;
        fetch(this.URL_TEMPLATE.replace('%lvl%', level)).then(async (res) => {
            this.data = await res.json();
            console.log(this.data);
            this.render();
        });
    }
}
