import {ForecastWeatherData} from "@/interfaces/forecast";

const apiKey = process.env.VUE_APP_OPENWEATHER_API_KEY;

export async function getForecastWeather(city: string, countryCode: string): Promise<ForecastWeatherData | null> {
    const url: string = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&appid=${apiKey}&lang=ru&units=metric`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Weather Forecast error: ${response.status}`);
    return response.json();
}

