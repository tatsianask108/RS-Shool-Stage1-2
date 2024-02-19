import './sources.css';
import { ISource } from '../../../types/index';

class Sources {
    draw(data: ISource[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        data.forEach((item: ISource) => {
            if (sourceItemTemp) {
                const sourceClone: DocumentFragment = sourceItemTemp.content.cloneNode(true) as DocumentFragment;
                const itemNameElement: Element | null = sourceClone.querySelector('.source__item-name');
                const itemElement: Element | null = sourceClone.querySelector('.source__item');
                if (itemNameElement instanceof HTMLElement && itemElement instanceof HTMLElement) {
                    itemNameElement.textContent = item.name;
                    itemElement.setAttribute('data-source-id', item.id.toString());
                }
                fragment.append(sourceClone);
            }
        });
        document.querySelector('.sources')?.append(fragment);
    }
}

export default Sources;
