import { CITY_API_ENDPOINTS } from "../constants/api";
import { CITIES_PER_PAGE } from "../constants/ui.constants";
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

    public async searchPageCount(
        name: string,
        state: string
    ): Promise<number> {
        return Math.ceil( await this.searchCount(name, state) / CITIES_PER_PAGE );
    }

    public async getCityById(cityId: number): Promise<City> {
        const response = await fetch(CITY_API_ENDPOINTS.GET_CITY_BY_ID(cityId));
        return await response.json() as City;
    }

    public async getSuggestions(input: string): Promise<string[]> {
        if (!input) return [];
        const response = await fetch(CITY_API_ENDPOINTS.GET_SUGGESTIONS(input));
        return await response.json() as string[];
    }

}

export default CityService;