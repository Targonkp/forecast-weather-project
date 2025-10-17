const apiKey = process.env.VUE_APP_OPENWEATHER_API_KEY;
import { Location } from "@/interfaces/location";

export async function getLocations(cityName: string): Promise<Location[]> {
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`,
  );
  if (!response.ok)
    throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);
  return response.json();
}
