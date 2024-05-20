import { City, Forecast } from "../data/entities";



function cacheForecastData(city: City, forecast: Forecast): void {
    sessionStorage.setItem(`city-${city.id}`, JSON.stringify(forecast));
}

function getStoredForecastData(city: City): Forecast | null {
    let data = sessionStorage.getItem(`city-${city.id}`);
    if (data) {
        return JSON.parse(data) as Forecast;
    }
    return null
}

export { cacheForecastData, getStoredForecastData };