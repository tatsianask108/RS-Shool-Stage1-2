export {renderProductForm};


const renderProductForm = (cardJson) => {
    let productForm = document.createElement('form');

    productForm.className = 'product-modal';
    
    productForm.innerHTML =
        `<div class="img-wrapper img-wrapper_cards">
            <img src="${cardJson.urlToImg}" alt="${cardJson.category}-image">
        </div>
        <div class="modal__description">
            <h3>${cardJson.name}</h3>
            <p class="card__description-p">${cardJson.description}</p>
            <div>Size</div>

            <div class="modal__tags">
                <label class="modal__tag">
                    <div class="modal__circle">S</div>
                    <input type="radio" name="sizes" value="s">
                    <span class="modal__tag-text">${cardJson.sizes.s.size}</span>
                </label>
                <label class="modal__tag">
                    <div class="modal__circle">M</div>
                    <input type="radio" name="sizes" value="m">
                    <span class="modal__tag-text">${cardJson.sizes.m.size}</span>
                </label>
                <label class="modal__tag">
                    <div class="modal__circle">L</div>
                    <input type="radio" name="sizes" value="l">
                    <span class="modal__tag-text">${cardJson.sizes.l.size}</span>
                </label>
            </div>

            <div>
                <div>Additives</div>
                <div class="modal__tags">
                <label class="modal__tag">
                    <div class="modal__circle">1</div>
                    <input type="checkbox" name="additives" value="0">
                    <span class="modal__tag-text">${cardJson.additives[0].name}</span>
                </label>
                <label class="modal__tag">
                    <div class="modal__circle">2</div>
                    <input type="checkbox" name="additives" value="1">
                    <span class="modal__tag-text">${cardJson.additives[1].name}</span>
                </label>
                <label class="modal__tag">
                    <div class="modal__circle">3</div>
                    <input type="checkbox" name="additives" value="2">
                    <span class="modal__tag-text">${cardJson.additives[2].name}</span>
                </label>
            </div>
            </div>
            <h3>Total: <span data-role="price">${cardJson.price}</span></h3>
        </div>`;

    productForm.productData = cardJson;
    initActions(productForm);

    return productForm;
}

/**
 * @param {HTMLElement} form - The DOM element to be processed.
 * @returns {void} - This function doesn't return anything.
 */
const initActions = (form) => {
    form.addEventListener('change', function(e) {
        let additional_price = 0;

        Array.from(form.elements).forEach((el) => { /** @param {HTMLElement} el */
            if(el.checked) {
                additional_price += +form.productData[el.name][el.value]['add-price'];
                el.parentElement.classList.add('selected');
            } else {
                el.parentElement.classList.remove('selected');
            }
        })

       form.querySelector('[data-role=price]').innerHTML = (+form.productData.price + additional_price).toFixed(2);
    });
}