
import { City, Forecast } from "../../data/entities";
import { Component, CompositeComponent } from "../patterns";
import { appendNewElement, newElement } from "../../utils/commons";
import { CityRepository, ForecastRepository } from "../../data/repositories";

interface Header<Data> {
    header: string,
    key: keyof Data
}


const CITY_HEADERS: Header<City>[] = [
    {"header": "City", "key": "city"},
    {"header": "State", "key": "stateName"},
];

const WEATHER_HEADERS: Header<Forecast>[] = [
    {"header": "Temperature", "key": "temperature"},
    {"header": "Probability of Rain", "key": "probabilityOfPrecipitation"},
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
        CITY_HEADERS.forEach((header, index) => {
            let currentChild = this.element.children[index];
            let currentData = this.city[header.key];
            currentChild.textContent = currentData.toString();
        });
        this.loadForecastData();
    }

    private async loadForecastData(): Promise<void> {
        for (let i = 0; i < WEATHER_HEADERS.length; i++) {
            this.element.children[CITY_HEADERS.length + i].textContent = "Loading";
        }
        try {
            let forecast = await this.forecastRepository.getForecastByCity(this.city);
            WEATHER_HEADERS.forEach((header, index) => {
                let currentChild = this.element.children[CITY_HEADERS.length + index];
                let currentData = forecast[header.key][0];
                currentChild.textContent = (currentData === null) ? "-" : currentData.toString();
            });
        } catch (error) {
            if (error instanceof DOMException) return;

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

    private params = {
        "name": "",
        "state": "",
        "page": "0",
    }
    
    constructor(cityRepository: CityRepository, forecastRepository: ForecastRepository) {
        super();
        this.cityRepository = cityRepository;
        this.forecastRepository = forecastRepository;

        this.createTableElement();
    }
    
    private createTableElement(): void {
        this.element = newElement("div", "container");
        const mainTable = appendNewElement(this.element, ["table", "table"]);
        const headers = appendNewElement(mainTable, ["thead"]);
        this.tableBody = appendNewElement(mainTable, ["tbody"]);
        const headerRow = appendNewElement(headers, ["tr", "city-header"]);
        
        CITY_HEADERS.forEach(h => appendNewElement(headerRow, ["td", undefined, h.header]));
        
        WEATHER_HEADERS.forEach(h => appendNewElement(headerRow, ["td", undefined, h.header]));
    }
 
    public async showData(): Promise<void> {
        this.forecastRepository.abortAllRequests();
        let cities: City[];

        try {
            cities = await this.cityRepository.searchCity(this.params);
        } catch (error) {
            console.log(error);
            appendNewElement(this.element, ["div", "error", "Unable to get data."]);
            return;
        }

        const rowCount = this.subcomponents.length;
        for (let i = rowCount; i < cities.length; i++) {
            this.addSubcomponent(new CityTableRow(this.forecastRepository));
        }
        this.removeSubcomponentAfterIndex(cities.length);

        const updateCityRowPromises = cities.map(async (city, index) => {
            let tableRow = this.subcomponents[index] as CityTableRow;
            tableRow.setCityData(city);
        });
        
        await Promise.all(updateCityRowPromises);
    }
    
    protected addSubcomponent(component: Component): void {
        super.addSubcomponent(component);
        this.tableBody.append(component.getElement());
    }

    private removeSubcomponentAfterIndex(index: number): void {
        if (index >= this.tableBody.children.length) return;
        this.subcomponents = this.subcomponents.slice(0, index);
        while (index < this.tableBody.children.length) {
            this.tableBody.removeChild(this.tableBody.children[index]);
        }
    }

    public setPage(page: number): void {
        this.params.page = String(page);
    }

    public setName(name: string): void {
        this.params.name = (name === null) ? "" : name;
    }

    public setState(state: string): void {
        this.params.state = (state === null) ? "" : state;
    }
    
}


export { CityTable };