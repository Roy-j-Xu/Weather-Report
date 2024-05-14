import { fetchCities, fetchForecast } from "./data_access";
import { City, Forecast } from "./entities";
import { Component, CompositeComponent } from "./patterns";

const CITY_HEADERS = [
    {"header": "City", "variable": "city"},
    {"header": "State", "variable": "stateId"},
];

const WEATHER_HEADERS = [
    {"header": "Temperature", "variable": "temperature"},
    {"header": "Probability of Rain", "variable": "probabilityOfPrecipitation"},
];

class CityTableRow extends Component {

    private cityData: City;
    private weatherData: Forecast[];

    protected element: HTMLElement;
    private states = {
        "cityLoaded": false,
        "weatherLoaded": false,
    }

    constructor() {
        super();
        this.element = document.createElement("tr");
        CITY_HEADERS.forEach(o => {
            this.element.appendChild(document.createElement("td"));
        });
        WEATHER_HEADERS.forEach(o => {
            const weatherEntry = document.createElement("td");
            weatherEntry.textContent = "Loading";
            this.element.appendChild(weatherEntry);
        });
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

    private stopLoading() {

    }

    public getElement(): HTMLElement {
        return this.element;
    }
    
}


class CityTable extends CompositeComponent {

    private page = 0;

    protected element: HTMLElement;

    constructor() {
        super();
        this.createTableElement();
        this.loadData();
    }
    
    private createTableElement(): void {
        this.element = document.createElement("table");
        this.element.className = "table";
        const headers = document.createElement("thead");
        const headerRow = document.createElement("tr");
        const tableBody = document.createElement("tbody");

        CITY_HEADERS.forEach(h => {
            const headerData = document.createElement("td");
            headerData.textContent = h.header;
            headerRow.appendChild(headerData);
        });
        WEATHER_HEADERS.forEach(h => {
            const headerData = document.createElement("td");
            headerData.textContent = h.header;
            headerRow.appendChild(headerData);
        });

        headers.appendChild(headerRow);
        this.element.appendChild(headers);
        this.element.appendChild(tableBody);
    }

    private async loadData(): Promise<void> {
        const cities = await fetchCities(this.page);
        const createColumnPromises = cities.map(async city => {
            const tableRow = new CityTableRow();
            this.addSubcomponent(tableRow);

            tableRow.setCityData(city);
            const forecast = await fetchForecast(city.lat, city.lng);
            tableRow.setWeatherData(forecast); 
        });

        await Promise.all(createColumnPromises);
    }

    protected addSubcomponent(component: Component): void {
        super.addSubcomponent(component);
        this.element.getElementsByTagName("tbody")[0].append(component.getElement());
    }
    
}

export { CityTable };