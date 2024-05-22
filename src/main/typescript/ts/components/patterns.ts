abstract class Component {
    protected element: HTMLElement;

    public animate(type?: string): void { }

    public getElement(): HTMLElement {
        return this.element;
    };
}

abstract class CompositeComponent extends Component {
    
    protected subcomponents: Component[] = [];

    public animate(type?: string): void {
        this.subcomponents.forEach(c => c.animate(type));
    }

    protected addSubcomponent(component: Component): void {
        this.subcomponents.push(component);
        this.element.appendChild(component.getElement());
    }

    protected removeAllSubcomponents(): void {
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