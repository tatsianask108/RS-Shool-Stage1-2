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
    let winnersPage = await renderWinnersPage();
    wrapper.append(garagePage);

    const toWinnersButton = document.getElementById('winnersButton') as HTMLButtonElement;
    toWinnersButton?.addEventListener('click', async () => {
        garagePage?.remove();
        winnersPage?.remove();
        winnersPage = await renderWinnersPage();
        wrapper.insertBefore(winnersPage, wrapper.children[1]);
    });

    const toGarageButton = document.getElementById('garageButton') as HTMLButtonElement;
    toGarageButton?.addEventListener('click', () => {
        winnersPage?.remove();
        wrapper.insertBefore(garagePage, wrapper.children[1]);
    });
})();
