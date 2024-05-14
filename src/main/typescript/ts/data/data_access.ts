import { City, Forecast } from "./entities";

const CITY_API = "http://localhost:8080/api/cities";
const FORECAST_API = "http://localhost:5000/forecast";

const prepareUrl = (api: string, params: Record<string, string>) => {
    return `${api}?${new URLSearchParams(params)}`;
}

async function fetchCities(page: number): Promise<City[]> {

    const response = await fetch(
        prepareUrl(CITY_API, {'page': `${page}`})
    );
    const cities = response.json().then(json => json as City[]);

    return cities;
}

async function fetchForecast(lat: number, lng: number, abortController?: AbortController): Promise<Forecast[]> {
    const response = await fetch(`${FORECAST_API}/${lat},${lng}`, { signal: abortController.signal });
    const forecast = response.json().then(json => json as Forecast[]);
    return forecast;
}

export { fetchCities, fetchForecast };