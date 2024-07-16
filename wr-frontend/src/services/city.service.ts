import { CITY_API_ENDPOINTS } from "../constants/api";
import City from "../types/city.type";

class CityService {

    public async searchCity(
        name: string,
        state: string,
        page: number
    ): Promise<City[]> {
        const response = await fetch(CITY_API_ENDPOINTS.SEARCH(name, state, page));
        return await response.json() as City[];
    }
    
    public async searchCount(
        name: string,
        state: string
    ): Promise<number> {
        const response = await fetch(CITY_API_ENDPOINTS.SEARCH_COUNT(name, state));
        return await response.json() as number;
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