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

// const box = document.querySelector('#svg-1') as HTMLElement;
// const carWrapper = document.querySelector('.car__wrapper') as HTMLDivElement;
// let startPosition = 90;
// const endPosition = carWrapper.offsetWidth - box.offsetWidth;
// // const speed = 64;

// async function move() {
//     if (startPosition < endPosition) {
//         startPosition += 1;
//         box.style.left = `${startPosition}px`;
//         requestAnimationFrame(move);
//     }
// }
// await move();
