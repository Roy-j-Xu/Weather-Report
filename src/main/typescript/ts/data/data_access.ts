import { City, Forecast } from "./entities";

const CITY_API = "http://localhost:8080/api/cities";
const FORECAST_API = "http://localhost:5000/forecast";

const prepareUrl = (api: string, params: Record<string, string>) => {
    let urlParams = new URLSearchParams(params);
    let emptyParams = [];
    urlParams.forEach((value, key) => {
        if (value === "") {
            emptyParams.push(key);
        }
    })
    emptyParams.forEach(key => urlParams.delete(key));

    console.log(`${api}?${urlParams}`)

    return `${api}?${urlParams}`;
}

async function fetchCities(params: Record<string, string>): Promise<City[]> {

    try {
        const response = await fetch(prepareUrl(CITY_API, params));
        const cities = response.json().then(json => json as City[]);
        return cities;
    } catch (error) {
        console.log(error);
    }
}

async function fetchForecast(lat: number, lng: number, abortController?: AbortController): Promise<Forecast[]> {
    const response = await fetch(`${FORECAST_API}/${lat},${lng}`, { signal: abortController.signal });
    const forecast = response.json().then(json => json as Forecast[]);
    return forecast;
}

export { fetchCities, fetchForecast };