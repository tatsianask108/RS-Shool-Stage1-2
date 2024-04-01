import { CAR_SVG } from '@app/components/car/car';
import { ICar, getCar, getWinners } from '@app/api';
import { createElement } from '@app/utils';

export interface IWinner {
    id?: number;
    wins: number;
    time: number;
}

function createWinners(winners: IWinner[], cars: ICar[]) {
    const winnersContainer = createElement({
        textContent: `Winners (${winners.length}) Page#1`,
        className: 'winners-page',
    });

    const numberContainer = createElement({ className: 'column', textContent: 'Number' });
    const carImgContainer = createElement({ className: 'column', textContent: 'Car' });
    const carContainer = createElement({ className: 'column', textContent: 'Model' });
    const winsContainer = createElement({ className: 'column', textContent: 'Wins' });
    const timeContainer = createElement({ className: 'column', textContent: 'Best time (seconds)' });

    const winnersTable = createElement({
        className: 'winners-table',
        childrenProp: [numberContainer, carImgContainer, carContainer, winsContainer, timeContainer],
    });

    winners.forEach((el, index) => {
        const numberElement = createElement({ tag: 'p' });
        numberElement.textContent = (index + 1).toString();

        const car = cars[index];
        const carElement = createElement({ tag: 'p' });
        carElement.textContent = car.name;

        const carImgElement = createElement({ tag: 'p', className: 'svg' });
        carImgElement.textContent = 'p';
        carImgElement.style.position = 'relative';
        const svgContainer = createElement({});
        svgContainer.innerHTML = CAR_SVG;
        svgContainer.style.fill = car.color;
        svgContainer.style.position = 'absolute';
        svgContainer.style.bottom = '0';
        carImgElement.append(svgContainer);

        const winsElement = createElement({ tag: 'p' });
        winsElement.textContent = el.wins?.toString();

        const timeElement = createElement({ tag: 'p' });
        timeElement.textContent = el.time?.toString();

        numberContainer.append(numberElement);
        carImgContainer.append(carImgElement);
        carContainer.append(carElement);
        winsContainer.append(winsElement);
        timeContainer.append(timeElement);
    });

    winnersContainer.append(winnersTable);
    return winnersContainer;
}

export default async function renderWinnersPage() {
    const response: IWinner[] = await getWinners();
    const carsPromises = response.map((winner) => getCar(`http://127.0.0.1:3000/garage/${winner.id}`));
    const cars = await Promise.all(carsPromises);
    const winners = createWinners(response, cars);
    return winners;
}
