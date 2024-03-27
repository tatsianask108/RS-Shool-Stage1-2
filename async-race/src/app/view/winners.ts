import { getWinners } from '../fetch-api';
import { createElement } from '../utils';

import '../styles/view.css';

export interface IWinner {
    id: number;
    wins: number;
    time: number;
}

function createWinners(data: IWinner[]) {
    const winnersContainer = createElement({ text: `Winners (${data.length}) Page#1`, className: 'winners-page' });

    // const numberContainer = createElement({ className: 'number-container', text: 'Number' });
    // const carContainer = createElement({ className: 'car-container', text: 'Car' });
    const winsContainer = createElement({ className: 'column', text: 'Wins' });
    const timeContainer = createElement({ className: 'column', text: 'Best time (seconds)' });

    const winnersTable = createElement({ className: 'winners-table', children: [winsContainer, timeContainer] });

    if (data.length) {
        data.forEach((el) => {
            // const numberElement = createElement({ tag: 'p' });
            // numberElement.textContent = el.index;

            // const carElement = createElement({ tag: 'p' });
            // carElement.textContent = el.;

            const winsElement = createElement({ tag: 'p' });
            winsElement.textContent = el.wins.toString();

            const timeElement = createElement({ tag: 'p' });
            timeElement.textContent = el.time.toString();

            winsContainer.append(winsElement);
            timeContainer.append(timeElement);
        });
    }
    winnersContainer.append(winnersTable);
    return winnersContainer;
}

export default async function renderWinners() {
    const response = await getWinners('http://127.0.0.1:3000/winners?_pages=1&_limit=10');
    const winners = createWinners(response);
    return winners;
}
