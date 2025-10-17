import { Location } from "@/interfaces/location";
import { ForecastWeatherData } from "@/interfaces/forecast";
import { Weather } from "@/interfaces/weather";

export interface DestinationState {
  ip: string | null;
  id: number | null;
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
