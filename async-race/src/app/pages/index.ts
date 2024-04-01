import { createElement } from '../utils';
import renderGaragePage from './garage';
import renderWinnersPage from './winners';

import '../styles/index.css';

const wrapper = createElement({ className: 'wrapper' });
document.body.append(wrapper);

(async () => {
    const buttonGarage = createElement({
        tag: 'button',
        className: 'button control-btn',
        textContent: 'To Garage',
        id: 'garageButton',
    });
    const buttonWinner = createElement({
        tag: 'button',
        className: 'button control-btn',
        textContent: 'To Winners',
        id: 'winnersButton',
    });

    const viewButtonsElement = createElement({
        className: 'switch-pages-buttons',
        childrenProp: [buttonGarage, buttonWinner],
    });

    const page = createElement({});
    const garage = await renderGaragePage();

    wrapper.append(viewButtonsElement, page);
    page.append(garage);

    buttonWinner?.addEventListener('click', async () => {
        const winners = await renderWinnersPage();
        Array.from(page.children).forEach((el) => el.remove());
        page.append(winners);
    });

    const toGarageButton = document.getElementById('garageButton') as HTMLButtonElement;
    toGarageButton?.addEventListener('click', () => {
        Array.from(page.children).forEach((el) => el.remove());
        page.append(garage);
    });
})();
