import { getWinners } from '../fetch-api';
import { createElement } from '../utils';

export interface IWinner {
    id: number;
    wins: number;
    time: number;
}

function createWinners(data: IWinner[]) {
    const winnersContainer = createElement({ text: `Winners (${data.length}) Page#1`, className: 'winners-page' });

    const numberContainer = createElement({ className: 'column', text: 'Number' });
    const carImgContainer = createElement({ className: 'column', text: 'Car' });
    const carContainer = createElement({ className: 'column', text: 'Model' });
    const winsContainer = createElement({ className: 'column', text: 'Wins' });
    const timeContainer = createElement({ className: 'column', text: 'Best time (seconds)' });

    const winnersTable = createElement({
        className: 'winners-table',
        children: [numberContainer, carImgContainer, carContainer, winsContainer, timeContainer],
    });

    if (data.length) {
        data.forEach((el, index) => {
            const numberElement = createElement({ tag: 'p' });
            numberElement.textContent = (index + 1).toString();

            const car = document.getElementById(`${el.id}`);
            const carElement = createElement({ tag: 'p' });
            const carModel = car?.querySelector('.car__name')?.textContent as string;
            carElement.textContent = carModel;

            const carImgElement = createElement({ tag: 'p', className: 'svg' });
            carImgElement.textContent = 'p';
            const svg = document.getElementById(`svg-${el.id}`) as HTMLElement;
            const clonedNode = svg.cloneNode(true);
            carImgElement.append(clonedNode);

            const winsElement = createElement({ tag: 'p' });
            winsElement.textContent = el.wins.toString();

            const timeElement = createElement({ tag: 'p' });
            timeElement.textContent = el.time.toString();

            numberContainer.append(numberElement);
            carImgContainer.append(carImgElement);
            carContainer.append(carElement);
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
