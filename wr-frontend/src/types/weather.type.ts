interface Weather {
    number: number;
    name: string;
    isDaytime: boolean;
    temperature: number;
    temperatureTrend: string;
    windSpeed: string;
    windDirection: string;
    shortForecast: string;
    detailedForecast: string;
    probabilityOfPrecipitation: number;
    dewpoint: number;
    relativeHumidity: number;
    date: string;
    time: string;
}

export default Weather;