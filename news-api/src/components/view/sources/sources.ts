import './sources.css';
import { ISource } from '../../../types/index';
import { isDocumentFragment, isHTMLElement } from '../../../helpers/helpers';

class Sources {
    public draw(data: ISource[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');
        if (!sourceItemTemp) {
            return;
        }
        data.forEach((item: ISource) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true);
            if (!isDocumentFragment(sourceClone)) {
                return;
            }
            const sourceItemName = sourceClone.querySelector('.source__item-name');
            const sourceItem = sourceClone.querySelector('.source__item');
            if (!(isHTMLElement(sourceItemName) && isHTMLElement(sourceItem))) {
                return;
            }
            sourceItemName.textContent = item.name;
            sourceItem.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });
        document.querySelector('.sources')?.append(fragment);
    }
}

export default Sources;
