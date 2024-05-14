import { Table } from "./abstract_components";
import { fetchCities, fetchForecast } from "../data_access";
import { City, Forecast } from "../entities";
import { Component, CompositeComponent } from "./patterns";
import { appendNewElement, newElement } from "../util";

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

    private states = {
        "cityLoaded": false,
        "weatherLoaded": false,
    }

    private cityData: City;
    private weatherData: Forecast[];

    constructor() {
        super();
        this.element = newElement("tr", "city-data");

        CITY_HEADERS.forEach(h => appendNewElement(this.element, ["td"]));
        WEATHER_HEADERS.forEach(h => appendNewElement(this.element, ["td", null, "Loading"]));
    }

    public setCityData(data: City): void {
        this.cityData = data;
        this.updateElement();
    }

    public setWeatherData(data: Forecast[]): void {
        this.weatherData = data;
        this.updateElement();
    }

    private updateElement(): void {
        if (this.cityData && !this.states.cityLoaded) {
            for (let i = 0; i < CITY_HEADERS.length; i++) {
                let currentChild = this.element.children[i];
                let currentData = this.cityData[CITY_HEADERS[i].variable];
                currentChild.textContent = currentData;
            }
            this.states.cityLoaded = true;
        }

        if (this.weatherData && !this.states.weatherLoaded) {
            for (let i = 0; i < WEATHER_HEADERS.length; i++) {
                let currentChild = this.element.children[CITY_HEADERS.length + i];
                let currentData = this.weatherData[WEATHER_HEADERS[i].variable][0];
                if (!currentData) currentData = "-";
                currentChild.textContent = currentData;
            }
            this.states.weatherLoaded = true;
        }
    }
    
}


class CityTable extends Table {
    
    protected element: HTMLElement;
    protected page: number;

    private abortController = new AbortController();

    private tableBody: HTMLElement;
    
    constructor(page?: number) {
        super();
        this.page = (page) ? page : 0;
        this.createTableElement();
        this.loadData();
    }
    
    private createTableElement(): void {
        this.element = newElement("table", "table");
        const headers = newElement("thead");
        const headerRow = newElement("tr", "city-header");
        
        this.tableBody = newElement("tbody");
        
        CITY_HEADERS.forEach(h => appendNewElement(headerRow, ["td", null, h.header]));
        
        WEATHER_HEADERS.forEach(h => appendNewElement(headerRow, ["td", null, h.header]));
        
        headers.appendChild(headerRow);
        this.element.appendChild(headers);
        this.element.appendChild(this.tableBody);
    }
    
    protected async loadData(): Promise<void> {
        const cities = await fetchCities(this.page);
        const createColumnPromises = cities.map(async city => {
            const tableRow = new CityTableRow();
            this.addSubcomponent(tableRow);
            
            tableRow.setCityData(city);
            const forecast = await fetchForecast(city.lat, city.lng, this.abortController);
            tableRow.setWeatherData(forecast); 
        });
        
        await Promise.all(createColumnPromises);
    }

    protected clearTable(): void {
        this.abortController.abort();
        super.removeAllSubcomponents();
        while (this.tableBody.firstChild) {
            this.tableBody.removeChild(this.tableBody.firstChild);
        }
        this.abortController = new AbortController();
    }
    
    protected addSubcomponent(component: Component): void {
        super.addSubcomponent(component);
        this.tableBody.append(component.getElement());
    }

    protected removeSubcomponent(component: Component): void {
        super.removeSubcomponent(component);
        console.table(this.tableBody);
        console.log(component);
        this.tableBody.removeChild(component.getElement());
    }
    
}

class CityPageButtons extends Component { 

    protected element: HTMLElement;
    private table: CityTable;

    constructor(table: CityTable) {
        super();
        this.table = table;
        this.createPageButtonElement();
    }

    private createPageButtonElement(): void {
        this.element = newElement("div");
        for (let i = 0; i < 6; i++) {
            const btn = newElement("button", "btn btn-light", String(i));
            btn.addEventListener("click", () => {
                this.table.setPage(i);
                const urlParams = new URLSearchParams(window.location.search);
                urlParams.set("page", String(i));
                window.location.search = urlParams.toString();
            });
            this.element.append(btn);
        }
    }

}




export { CityTable, CityPageButtons };