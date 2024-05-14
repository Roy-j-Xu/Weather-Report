interface City {
    id: number;
    city: string;
    stateId: string;
    stateName: string;
    lat: number;
    lng: number;
    timezone: string;
}

interface Forecast {
    number: number[];
    name: string[];
    isDaytime: boolean[];
    temperature: number[];
    temperatureTrend: string[];
    windSpeed: string[];
    windDirection: string[];
    shortForecast: string[];
    detailedForecast: string[];
    probabilityOfPrecipitation: number[];
    dewpoint: number[];
    relativeHumidity: number[];
    date: string[];
    time: string[];
}

export { City, Forecast };