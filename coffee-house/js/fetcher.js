import json from './../products.json' assert  { type: 'json' };

class Fetcher {
    constructor() {
        this.apiUrl = 'https://url-api'
        this.cachedProducts = [];
    }

    getProducts() {
        if(this.cachedProducts.length) {
            return this.cachedProducts;
        }

        this.loadProducts();

        return this.cachedProducts;
    } 

    loadProducts() {
        //this.cachedProducts = fetch(this.apiUrl);
        this.cachedProducts = json;
    }
}

const fetcher = new Fetcher();

export {Fetcher, fetcher}