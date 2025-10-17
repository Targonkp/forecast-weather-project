export interface ForecastListItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
  dt_txt: string;
}

export interface ForecastWeatherData {
  cod: string;
  list: ForecastListItem[];
  city: {
    id: number;
    name: string;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}
