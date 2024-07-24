class CacheService {
    public cacheJwtToken(token: string): void {
        localStorage.setItem("jwtToken", token);
    }

    public getJwtToken(): string {
        const token = localStorage.getItem("jwtToken");
        if (!token) throw new Error("JWT token does not exist in local storage.");
        return token;
    }
}

const cacheService = new CacheService();

export default cacheService;