import { createElement } from '../utils';
import renderGarage from './garage';
/* import renderWinners from './winners'; */

import '../styles/view.css';

const wrapper = createElement({ className: 'wrapper' });
document.body.append(wrapper);

function renderViewButtons() {
    const element = createElement({
        children: [
            createElement({ tag: 'button', className: 'button', text: 'To Garage', id: 'garageButton' }),
            createElement({ tag: 'button', className: 'button', text: 'To Winners', id: 'winnersButton' }),
        ],
    });
    wrapper.append(element);
}

(async () => {
    renderViewButtons();
    const garage = await renderGarage();
    wrapper.append(garage);
    // const winners = await renderWinners();
    const winners = document.createElement('div');

    const toWinnersButton = document.getElementById('winnersButton') as HTMLButtonElement;
    toWinnersButton?.addEventListener('click', async () => {
        garage?.remove();
        wrapper.insertBefore(winners, wrapper.children[1]);
    });

    const toGarageButton = document.getElementById('garageButton') as HTMLButtonElement;
    toGarageButton?.addEventListener('click', () => {
        winners?.remove();
        wrapper.insertBefore(garage, wrapper.children[1]);
    });
})();
