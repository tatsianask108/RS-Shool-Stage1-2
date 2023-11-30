import json from '../products.json' assert  { type: 'json' };

const createModalElement = (cardJson) => {
    let overlay = document.createElement('div');
    overlay.className = 'overlay';

    overlay.innerHTML =
        `<div class="modal">
        <div class="img-wrapper img-wrapper_cards">
            <img src="${cardJson.urlToImg}" alt="${cardJson.category}-image">
        </div>
        <div class="modal__description">
            <h3>${cardJson.name}</h3>
            <p class="card__description-p">${cardJson.description}</p>
            <div>Size</div>

            <div class="modal__tags">
                <div class="modal__tag">
                    <div class="modal__circle">S</div>
                    <span class="modal__tag-text">${cardJson.sizes.s.size}</span>
                </div>
                <div class="modal__tag">
                    <div class="modal__circle">M</div>
                    <span class="modal__tag-text">${cardJson.sizes.m.size}</span>
                </div>
                <div class="modal__tag">
                    <div class="modal__circle">L</div>
                    <span class="modal__tag-text">${cardJson.sizes.l.size}</span>
                </div>
            </div>

            <div>
                <div>Additives</div>
                <div class="modal__tags">
                <div class="modal__tag">
                    <div class="modal__circle">1</div>
                    <span class="modal__tag-text">${cardJson.additives[0].name}</span>
                </div>
                <div class="modal__tag">
                    <div class="modal__circle">2</div>
                    <span class="modal__tag-text">${cardJson.additives[1].name}</span>
                </div>
                <div class="modal__tag">
                    <div class="modal__circle">3</div>
                    <span class="modal__tag-text">${cardJson.additives[2].name}</span>
                </div>
            </div>
            </div>
            <h3>Total: ${cardJson.price}</h3>
        </div>
    </div>`

    return overlay;
}

const renderModal = (productName) => {
    const body = document.body

    json.filter(card => card?.name === productName).forEach(cardJson => {
        const modalElement = createModalElement(cardJson);
        body.append(modalElement);
    })

}

const addCardsListeners = () => {
    const gridContainer = document?.getElementById('gridContainer');
    gridContainer.addEventListener('click', (e) => {
        if (!e.target.closest('.card')) {
            return;
        }
        const clickedProductName = e.target.closest('.card').lastElementChild.firstElementChild.textContent;
        renderModal(clickedProductName);
    })

}

addCardsListeners();


const closeModal = (e) => {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('overlay')) {
            document.querySelector('.overlay').remove();
        }
    })

}
closeModal()

