export type Props<T extends HTMLElement = HTMLElement> = Partial<T> & {
    tag?: keyof HTMLElementTagNameMap;
    data?: DOMStringMap;
};

export default class BaseComponent<T extends HTMLElement = HTMLElement> {
    protected node: T;

    protected children: BaseComponent[] = [];

    constructor(props: Props<T>, ...children: (BaseComponent | HTMLElement | null)[]) {
        const node = document.createElement(props.tag ?? 'div') as T;
        Object.assign(node, props);

        if (props.data) {
            Object.entries(props.data).forEach(([name, value]) => {
                node.dataset[name] = value;
            });
        }

        this.node = node;

        if (children) {
            this.appendChildren(children);
        }
    }

    protected append(child: BaseComponent | HTMLElement): void {
        if (child instanceof BaseComponent) {
            this.children.push(child);
            this.node.append(child.getNode());
        } else {
            this.node.append(child);
        }
    }

    public appendChildren(children: (BaseComponent | HTMLElement | null)[]): void {
        children.forEach((el) => {
            if (el) {
                this.append(el);
            }
        });
    }

    public setTextContent(text: string): void {
        this.node.textContent = text;
    }

    public getNode() {
        return this.node;
    }

    public addClass(className: string): void {
        this.node.classList.add(className);
    }

    public removeClass(className: string): void {
        this.node.classList.remove(className);
    }

    public addListener(event: string, listener: () => void) {
        this.node.addEventListener(event, listener);
    }

    public destroyChildren(): void {
        this.children.forEach((child) => {
            child.destroy();
        });
        this.children.length = 0;
    }

    public destroy(): void {
        this.destroyChildren();
        this.node.remove();
    }
}
