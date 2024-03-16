import BaseComponent, { Props } from '@components/base-component';

export default class SelectComponent extends BaseComponent<HTMLSelectElement> {
    constructor(props: Props, options: Props<HTMLOptionElement>[]) {
        super(
            { ...props, tag: 'select' },
            ...options.map((option) => {
                return new BaseComponent<HTMLOptionElement>({
                    tag: 'option',
                    ...option,
                });
            })
        );
    }
}
