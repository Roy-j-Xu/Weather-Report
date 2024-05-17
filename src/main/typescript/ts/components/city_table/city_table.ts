
import { City, Forecast } from "../../data/entities";
import { Component, CompositeComponent } from "../patterns";
import { appendNewElement, newElement } from "../../utils/commons";
import { CityRepository, ForecastRepository } from "../../data/repositories";

const CITY_HEADERS = [
    {"header": "City", "variable": "city"},
    {"header": "State", "variable": "stateName"},
];

const WEATHER_HEADERS = [
    {"header": "Temperature", "variable": "temperature"},
    {"header": "Probability of Rain", "variable": "probabilityOfPrecipitation"},
];


class CityTableRow extends Component {

    protected element: HTMLElement;

    private forecastRepository: ForecastRepository;

    private city: City;

    constructor(forecastRepository: ForecastRepository) {
        super();
        this.element = newElement("tr", "city-data");
        this.forecastRepository = forecastRepository;

        this.createRowElement();
    }

    private createRowElement(): void {
        CITY_HEADERS.forEach(h => appendNewElement(this.element, ["td"]));
        WEATHER_HEADERS.forEach(h => appendNewElement(this.element, ["td"]));
    }

    public async setCityData(data: City): Promise<void> {
        this.city = data;
        for (let i = 0; i < CITY_HEADERS.length; i++) {
            let currentChild = this.element.children[i];
            let currentData = this.city[CITY_HEADERS[i].variable];
            currentChild.textContent = currentData;
        }
        this.loadForecastData();
    }

    private async loadForecastData(): Promise<void> {
        for (let i = 0; i < WEATHER_HEADERS.length; i++) {
            this.element.children[CITY_HEADERS.length + i].textContent = "Loading";
        }
        try {
            let forecast = await this.forecastRepository.getForecastByCity(this.city);

            for (let i = 0; i < WEATHER_HEADERS.length; i++) {
                let currentChild = this.element.children[CITY_HEADERS.length + i];
                let currentData = forecast[WEATHER_HEADERS[i].variable][0];
                if (!currentData) currentData = "-";
                currentChild.textContent = currentData;
            }
        } catch (error) {
            if (error instanceof DOMException) {
                return;
            }

            for (let i = 0; i < WEATHER_HEADERS.length; i++) {
                let currentChild = this.element.children[CITY_HEADERS.length + i];
                currentChild.textContent = "Error";
            }
        }
    }

}



class CityTable extends CompositeComponent {
    
    protected element: HTMLElement;
    private tableBody: HTMLElement;

    private cityRepository: CityRepository;
    private forecastRepository: ForecastRepository;

    private name = "";
    private state = "";
    private page = 0;
    
    constructor(cityRepository: CityRepository, forecastRepository: ForecastRepository) {
        super();
        this.cityRepository = cityRepository;
        this.forecastRepository = forecastRepository;

        this.createTableElement();
        console.log("New table created");
        setTimeout(this.showData, 1000);
    }
    
    private createTableElement(): void {
        this.element = newElement("div", "container");
        const mainTable = newElement("table", "table");
        const headers = newElement("thead");
        const headerRow = newElement("tr", "city-header");
        
        this.tableBody = newElement("tbody");
        
        CITY_HEADERS.forEach(h => appendNewElement(headerRow, ["td", null, h.header]));
        
        WEATHER_HEADERS.forEach(h => appendNewElement(headerRow, ["td", null, h.header]));
        
        headers.appendChild(headerRow);
        mainTable.appendChild(headers);
        mainTable.appendChild(this.tableBody);
        this.element.appendChild(mainTable);
    }
    
    public async showData(): Promise<void> {
        this.clear();
        const cities = await this.cityRepository.searchCity(this.name, this.state, this.page);

        const rowCount = this.subcomponents.length;

        for (let i = rowCount; i < cities.length; i++) {
            this.addSubcomponent(new CityTableRow(this.forecastRepository));
        }

        for (let i = cities.length; i < rowCount; i++) {
            this.removeSubcomponent(this.subcomponents[i]);
        }

        const updateCityRowPromises = cities.map(async (city, index) => {
            let tableRow = this.subcomponents[index] as CityTableRow;
            tableRow.setCityData(city);
        });
        
        await Promise.all(updateCityRowPromises);
    }

    public clear(): void {
        this.forecastRepository.abortAllRequests();
        super.clear();
    }
    
    protected addSubcomponent(component: Component): void {
        super.addSubcomponent(component);
        this.tableBody.append(component.getElement());
    }

    protected removeSubcomponent(component: Component): void {
        super.removeSubcomponent(component);
        this.tableBody.removeChild(component.getElement());
    }

    public setPage(page: number): void {
        this.page = page;
    }

    public setName(name: string): void {
        this.name = (name === null) ? "" : name;
    }

    public setState(state: string): void {
        this.state = (state === null) ? "" : state;
    }
    
}


export { CityTable };