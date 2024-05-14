abstract class Component {
    protected element: HTMLElement;

    public delete(): void { }

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

    protected removeAllSubcomponents(): void {
        this.subcomponents.forEach(c => c.delete());
        this.subcomponents = [];
    }

    protected removeSubcomponent(component: Component): void {
        this.subcomponents = this.subcomponents.filter((c) => c == component);
    }

    protected getChildElements(): HTMLElement[] {
        return this.subcomponents.map((c) => c.getElement());
    }

}

export { Component, CompositeComponent };