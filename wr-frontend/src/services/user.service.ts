import { USER_API_ENDPOINTS } from "../constants/api";
import City from "../types/city.type";
import cacheService from "./cache.service";

export default class UserService {

    public async getLikedCitiesByUsername(username: string): Promise<City[]> {
        const headers = {
            "Authorization": `Bearer ${cacheService.getJwtToken()}`
        }
        const response = await fetch(USER_API_ENDPOINTS.GET_LIKES(username), {
            method: "GET",
            headers: headers
        });
        return await response.json() as City[];
    }
}