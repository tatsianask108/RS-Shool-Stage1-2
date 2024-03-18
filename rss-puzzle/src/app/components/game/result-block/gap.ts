import BaseComponent from '@components/base-component';
import Word from '../word';

export default class Gap extends BaseComponent {
    private observer: MutationObserver;

    constructor() {
        super({ className: 'gap', tag: 'div' });
        this.observer = new MutationObserver(() => {
            this.setWidth();
        });

        this.observer.observe(this.node, { childList: true });
    }

    public destroyChildren(): void {
        super.destroyChildren();
        this.observer.disconnect();
    }

    public hasWordNode() {
        return this.node.hasChildNodes();
    }

    public setWidth() {
        const childNode = this.getWordNode();
        if (childNode) {
            this.node.style.flexBasis = childNode?.style?.minWidth;
            this.node.style.flexGrow = '0';
        } else {
            this.node.style.flexBasis = '';
            this.node.style.flexGrow = '';
        }
    }

    public addWord(word: Word) {
        if (this.hasWordNode()) {
            throw new Error();
        }
        this.node.append(word.getNode());
    }

    public getWordNode() {
        return this.node.firstElementChild as HTMLElement;
    }
}
