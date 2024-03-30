import { createElement } from '../utils';
import renderGaragePage from './garage';
import renderWinnersPage from './winners';

import '../styles/index.css';

const wrapper = createElement({ className: 'wrapper' });
document.body.append(wrapper);

function renderViewButtons() {
    const element = createElement({
        className: 'switch-pages-buttons',
        childrenProp: [
            createElement({ tag: 'button', className: 'button', textContent: 'To Garage', id: 'garageButton' }),
            createElement({ tag: 'button', className: 'button', textContent: 'To Winners', id: 'winnersButton' }),
        ],
    });
    wrapper.append(element);
}

(async () => {
    renderViewButtons();
    const garagePage = await renderGaragePage();
    wrapper.append(garagePage);
    const winners = await renderWinnersPage();

    const toWinnersButton = document.getElementById('winnersButton') as HTMLButtonElement;
    toWinnersButton?.addEventListener('click', async () => {
        garagePage?.remove();
        wrapper.insertBefore(winners, wrapper.children[1]);
    });

    const toGarageButton = document.getElementById('garageButton') as HTMLButtonElement;
    toGarageButton?.addEventListener('click', () => {
        winners?.remove();
        wrapper.insertBefore(garagePage, wrapper.children[1]);
    });
})();
