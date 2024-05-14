abstract class Component {
    protected element: HTMLElement;
    public getElement(): HTMLElement {
        return this.element;
    };
}

abstract class CompositeComponent extends Component {
    
    protected subcomponents: Component[] = [];

    protected addSubcomponent(component: Component): void {
        this.subcomponents.push(component);
        this.element.appendChild(component.getElement());
    }

    protected removeSubcomponent(component: Component) {
        this.subcomponents = this.subcomponents.filter((c) => c == component);
    }

    protected getChildElements(): HTMLElement[] {
        return this.subcomponents.map((c) => c.getElement());
    }

}

export { Component, CompositeComponent };