
function newElement(tagName: string, className?: string, textContent?: string): HTMLElement {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
    return element;
}

function appendNewElement(target: HTMLElement, element: [string, string?, string?]): HTMLElement {
    const newChild = newElement(element[0], element[1], element[2]);
    target.appendChild(newChild);
    return newChild;
}

function getElementById(id: string): HTMLElement {
    const element = document.getElementById(id);
    if (element !== null) return element;
    throw new Error("Id ${id} not found in html file.");
}

function setUrlParam(param: string, value: string | number): void {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(param, String(value));
    window.location.search = urlParams.toString();
}


export { newElement, appendNewElement, getElementById, setUrlParam };