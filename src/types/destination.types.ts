import {Location} from "@/types/location.types";
import {ForecastWeatherData} from "@/types/forecast.type";

export interface DestinationState {
    ip: string | null;
    city: string | null;
    country: string | null;
    error: string | null;
    loading: boolean;
    currentWeather: Record<string, any> | null;
    lastGeoDataFetchedAt: number | null;
    lastForecastFetchedAt: number | null;
    listLocations: Location[];
    listForecasts: ForecastWeatherData | null;
}
