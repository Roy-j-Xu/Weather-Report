import { fetchCities, fetchForecast } from "./data_access";
import { City, Forecast } from "./entities";
import { cacheForecastData, getStoredForecastData } from "../utils/caching";


class CityRepository {

    public async getAllCitiesByPage(page: number): Promise<City[]> {
        return await fetchCities({"page": `${page}`});
    }

    public async searchCity(params: Record<string, string>): Promise<City[]> {
        return await fetchCities(params);
    }

}

class ForecastRepository {

    private abortController = new AbortController();

    public async getForecastByCity(city: City): Promise<Forecast> {
        const storedData = getStoredForecastData(city)
        if (storedData) {
            return storedData;
        }
        let forecastData = await fetchForecast(city.lat, city.lng, this.abortController)
        cacheForecastData(city, forecastData)
        return forecastData;
    }

    public abortAllRequests(): void {
        this.abortController.abort();
        this.abortController = new AbortController();
    }

}


export { CityRepository, ForecastRepository };