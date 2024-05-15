
function newElement(tagName: string, className?: string, textContent?: string): HTMLElement {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
    return element;
}

function appendNewElement(target: HTMLElement, element: [string, string?, string?]): void {
    target.appendChild(newElement(element[0], element[1], element[2]));
}

function setUrlParam(param: string, value: string | number): void {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(param, String(value));
    window.location.search = urlParams.toString();
}


export { newElement, appendNewElement, setUrlParam };