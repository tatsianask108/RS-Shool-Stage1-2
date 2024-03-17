import BaseComponent from '@components/base-component';

export default class Word extends BaseComponent {
    constructor(protected value: string) {
        super({ className: 'puzzle', tag: 'span', textContent: value });
    }

    public getValue() {
        return this.value;
    }

    public append(child: BaseComponent | HTMLElement): void {
        if (child instanceof BaseComponent) {
            this.children.push(child);
            this.node.append(child.getNode());
        } else {
            this.node.append(child);
        }
    }
}
