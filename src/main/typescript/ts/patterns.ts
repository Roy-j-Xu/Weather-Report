abstract class Component {
    abstract render(): HTMLElement;
}

abstract class CompositeComponent extends Component {
    
    protected subcomponents: Component[] = [];

    addSubcomponent(components: Component | Component[]): void {
        console.log(components);
        if (Array.isArray(components)) {
            this.subcomponents = this.subcomponents.concat(components);
        } else {
            this.subcomponents.push(components);
        }
    }

    removeSubcomponent(components: Component | Component[]) {
        if (Array.isArray(components)) {
            this.subcomponents = this.subcomponents.filter((c) => components.includes(c));
        } else {
            this.subcomponents = this.subcomponents.filter((c) => c == components);
        }
    }

    abstract render(): HTMLElement;

    protected renderSubcomponents(): HTMLElement[] {
        return this.subcomponents.map((c) => c.render());
    }

}

export { Component, CompositeComponent };