export class Card {
    constructor({ name, description, price, category }) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
    }

    createCard() {
        let card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-category', this.category)

        card.innerHTML =
            `<div class="img-wrapper img-wrapper_cards">
                <img src="img/menu-page/coffee/coffee-1.jpg" alt="coffee">
            </div>
            <div class="card__description">
                <h3>${this.name}</h3>
                <p class="card__description-p">${this.description}</p>
                <h3>${this.price}</h3>
            </div>`
        console.log(card)
        return card;
    }
}