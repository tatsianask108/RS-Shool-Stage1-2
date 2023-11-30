import { burgerFunction } from './js/burger.js';
import json from './products.json' assert  { type: 'json' };

const DEFAULT_TAG = 'coffee';
const gridContainer = document.getElementById('gridContainer');
const loadMoreBtn = document.getElementById('loadMore');


const switchClickedTag = (clickedTag, tags) => {
    // console.log('clickedTag', clickedTag);
    tags.forEach(tag => {
        tag.classList.remove('tag__selected');
    })
    clickedTag.classList.add('tag__selected');

    return clickedTag?.dataset?.tag;
}

const addTagsListeners = () => {
    const tagsContainer = document.getElementById('offerTags');
    const tags = tagsContainer.querySelectorAll('div');
    // console.log(tags)

    tagsContainer.addEventListener('click', (e) => {
        if (!e.target.closest("div")) {
            return;
        }
        const tagName = switchClickedTag(e.target.closest("div"), tags);

        // console.log('tagName', tagName);

        renderCardsList(tagName);
    });

}

addTagsListeners();


const createCardElement = (cardJson) => {
    let card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-category', cardJson.category)

    card.innerHTML =
        `<div class="img-wrapper img-wrapper_cards">
            <img src="${cardJson.urlToImg}" alt="${cardJson.category}-image">
        </div>
        <div class="card__description">
            <h3>${cardJson.name}</h3>
            <p class="card__description-p">${cardJson.description}</p>
            <h3>${cardJson.price}</h3>
        </div>`
    //console.log(card);

    return card;
}

const addLoadMoreBtnListeners = () => {
    const cards = gridContainer.querySelectorAll('.card');

    loadMoreBtn?.addEventListener('click', () => {
        cards?.forEach(card => card.classList.remove('card--hidden'));
        loadMoreBtn.classList.remove('refresh-btn--visible')
    })

}
const showMenuLayout = () => {
    const cards = gridContainer.querySelectorAll('.card');

    if (window.innerWidth <= 768 && cards.length > 4) {
        cards.forEach((el, index) => index >= 4 ? el.classList.add('card--hidden') : null);
        loadMoreBtn.classList.add('refresh-btn--visible');
    } else {
        cards.forEach(el => el.classList.remove('card--hidden'));
        loadMoreBtn.classList.remove('refresh-btn--visible');
    }

}


const renderCardsList = (filterTag = DEFAULT_TAG) => {
    // const gridContainer = document.getElementById('gridContainer');
    gridContainer.innerHTML = '';

    json.filter(card => card?.category === filterTag).forEach(cardJson => {
        const cardElement = createCardElement(cardJson);
        gridContainer.append(cardElement);
    })

    showMenuLayout()
    window.addEventListener('resize', showMenuLayout);
    addLoadMoreBtnListeners();
}

renderCardsList();






