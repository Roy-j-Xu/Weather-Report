import { Component, CompositeComponent } from "./patterns";
import { City } from "./entities";

class CityTableRow extends Component {

    private readonly city: City;

    constructor(city: City) {
        super();
        this.city = city;
    }

    render(): HTMLElement {
        const row = document.createElement('tr');

        const cityNameElement = document.createElement('td');
        cityNameElement.textContent = `${this.city.city}`;
        const stateElement = document.createElement('td');
        stateElement.textContent = `${this.city.state_name}`;

        row.appendChild(cityNameElement);
        row.appendChild(stateElement);

        return row;
    }
    
}

class CityTable extends CompositeComponent {
    constructor() {
        super();
    }

    render(): HTMLElement {
        const element = document.createElement('table');
        this.renderSubcomponents().forEach((c) => element.appendChild(c));
        return element;
    }    
}

export { CityTableRow, CityTable };