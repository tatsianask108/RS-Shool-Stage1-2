import json from './products.json' assert  { type: 'json' };

const DEFAULT_TAG = 'coffee';

function burgerFunction() {
    const burgerBtn = document.getElementById("burger-btn");
    const nav = document.getElementById("nav");
    const navItems = nav?.querySelectorAll("a");

    burgerBtn.addEventListener("click", () => {
        nav.classList.toggle("nav--visible");
        burgerBtn.classList.toggle("burger--active");

        navItems.forEach(el => {
            el.addEventListener('click', () => {
                burgerBtn?.classList.remove('burger--active');
                nav?.classList.remove('nav--visible');
            });
        });
    })
}
burgerFunction();

const switchClickedTag = (clickedTag, tags) => {
    // console.log('clickedTag', clickedTag);
    tags.forEach(tag => {
        tag.classList.remove('tag__selected');
    })
    clickedTag.classList.add('tag__selected');

    return clickedTag?.dataset?.tag;
};

const addTagsListeners = () => {
    const tagsContainer = document.getElementById('offerTags');
    const tags = tagsContainer.querySelectorAll('div');

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

const renderCardsList = (filterTag = DEFAULT_TAG) => {
    const gridContainer = document.querySelector('[data-grid]');
    gridContainer.innerHTML = '';

    json.filter(card => card?.category === filterTag).forEach(cardJson => {
        const cardElement = createCardElement(cardJson);
        gridContainer.append(cardElement);
    })
}

renderCardsList();


