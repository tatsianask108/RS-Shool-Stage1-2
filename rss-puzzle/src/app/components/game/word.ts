import BaseComponent from '@components/base-component';

export default class Word extends BaseComponent {
    constructor(protected value: string) {
        super({ className: 'puzzle', tag: 'span', textContent: value });
    }

    public getValue() {
        return this.value;
    }
}
