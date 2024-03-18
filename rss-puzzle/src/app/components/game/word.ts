import { CONTENT_URL } from '@app/constants';
import BaseComponent from '@components/base-component';

export default class Word extends BaseComponent {
    protected background: HTMLDivElement;

    constructor(
        protected value: string,
        width: number,
        image: string
    ) {
        super({ className: 'puzzle', tag: 'div', textContent: value });
        this.setWidth(width);

        this.node.style.overflow = 'hidden';
        this.node.style.position = 'relative';

        this.background = document.createElement('div');
        this.background.classList.add('puzzle-background');
        this.background.innerHTML = `<img src="${CONTENT_URL}/images/${image}" style="display: block; width: 100%" />`;

        this.background.style.position = 'absolute';
        this.background.style.zIndex = '-1';
        this.background.style.top = '0';
        this.background.style.left = '0';
        this.background.style.pointerEvents = 'none';

        this.append(this.background);
    }

    public getValue() {
        return this.value;
    }

    public setWidth(size: number) {
        this.node.style.minWidth = `${Math.floor(size)}%`;
    }

    public setPadding(translateX: string, top: string) {
        this.background.style.translate = `${translateX} 0`;
        this.background.style.top = top;
    }

    public setBackgroundWidth(width: string) {
        this.background.style.width = width;
    }

    public getWidth() {
        return parseFloat(this.node.style.minWidth);
    }
}
