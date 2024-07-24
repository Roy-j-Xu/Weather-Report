import { AUTH_API_ENDPOINTS } from "../constants/api"
import JWT from "../types/jwt.type";
import cacheService from "./cache.service";

export default class AuthService {

    public async login(username: string, password: string): Promise<JWT> {
        const body = JSON.stringify({
            username: username,
            password: password
        });
        const headers = {
            "Content-Type": "application/json"
        };

        const response = await fetch(AUTH_API_ENDPOINTS.LOGIN, {
                method: "POST",
                body: body,
                headers: headers
            }
        )
        if (response.status != 200) throw new Error("Login fails.");

        const jwt = await response.json() as JWT;
        cacheService.cacheJwtToken(jwt.token);
        return jwt;
    }
}