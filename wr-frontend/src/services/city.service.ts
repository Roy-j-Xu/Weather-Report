import { CITY_API_ENDPOINTS } from "../constants/api";
import City from "../types/city";

class CityService {

    public async searchCity(
        name: string,
        state: string,
        page: number
    ): Promise<City[]> {
        const response = await fetch(CITY_API_ENDPOINTS.SEARCH(name, state, page));
        return await response.json() as City[];
    }

    public async getCityById(cityId: number): Promise<City> {
        const response = await fetch(CITY_API_ENDPOINTS.GET_CITY_BY_ID(cityId));
        return await response.json() as City;
    }

    public async getSuggestions(input: string): Promise<string[]> {
        const response = await fetch(CITY_API_ENDPOINTS.GET_SUGGESTIONS(input));
        return await response.json() as string[];
    }

}

export default CityService;