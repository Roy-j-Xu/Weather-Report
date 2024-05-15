import { City, Forecast } from "../data/entities";



function cacheForecastData(city: City, forecast: Forecast[]): void {
    sessionStorage.setItem(`city-${city.id}`, JSON.stringify(forecast));
}

function getStoredForecastData(id: number): Forecast[] | null {
    let data = sessionStorage.getItem(`city-${id}`);
    if (data) {
        return JSON.parse(data) as Forecast[];
    }
    return null
}

export { cacheForecastData, getStoredForecastData };