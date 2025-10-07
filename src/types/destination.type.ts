import {Location} from "@/types/location.types";
import {ForecastWeatherData} from "@/types/forecast.type";
import {Weather} from "@/types/weather.type";

export interface DestinationState {
    ip: string | null;
    city: string | null;
    country: string | null;
    error: string | null;
    loading: boolean;
    currentWeather: Weather | null;
    lastGeoDataFetchedAt: number | null;
    lastForecastFetchedAt: number | null;
    listLocations: Location[];
    listForecasts: ForecastWeatherData | null;
}
