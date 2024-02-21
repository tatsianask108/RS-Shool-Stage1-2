export function isDocumentFragment(element: unknown): element is DocumentFragment {
    return element instanceof DocumentFragment;
}
export function isHTMLElement(element: unknown): element is HTMLElement {
    return element instanceof HTMLElement;
}
