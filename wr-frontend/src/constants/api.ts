const CITY_API = "http://localhost:8080/api/cities";
const CITY_API_ENDPOINTS = {
    SEARCH: (name: string, state: string, page: number) =>
                `${CITY_API}?name=${name}&state=${state}&page=${page}`,
    SEARCH_COUNT: (name: string, state: string) =>
                `${CITY_API}/search-count?name=${name}&state=${state}`,
    GET_CITY_BY_ID: (cityId: number) => `${CITY_API}/${cityId}`,
    GET_SUGGESTIONS: (input: string) => `${CITY_API}/suggestions/${input}`
};

const AUTH_API = "http://localhost:8080/api/auth";
const AUTH_API_ENDPOINTS = {
    SIGNUP: `${AUTH_API}/signup`,
    LOGIN: `${AUTH_API}/login`,
};


const USER_API = "http://localhost:8080/api/users"
const USER_API_ENDPOINTS = {
    LIKE: (userId: number, cityId: number) => `${USER_API}/like/${userId},${cityId}`,
    GET_LIKES: (username: string) => `${USER_API}/like/${username}`
};



const FORECAST_API =  "http://localhost:5000/forecast";
const FORECAST_API_ENDPOINTS = {
    FORECAST: (lat: number, lng: number) => `${FORECAST_API}/${lat},${lng}`
};


export {
    CITY_API_ENDPOINTS,
    AUTH_API_ENDPOINTS,
    USER_API_ENDPOINTS,
    FORECAST_API_ENDPOINTS
};