import { defineStore } from "pinia";

import { getCurrentWeather } from "@/api/current_weather.api";
import { getIp } from "@/api/ip.api";
import { getGeoByIp } from "@/api/geo_ip.api";
import { getForecastWeather } from "@/api/forecast_weather.api";
import { getLocations } from "@/api/locations.api";

import { Location } from "@/interfaces/location";
import { DestinationState } from "@/interfaces/destination";

const CACHE_DURATION_MINUTES = 10;

export const useDestinationStore = defineStore("DestinationStore", {
  state: (): DestinationState => ({
    ip: null,
    id: null,
    city: null,
    country: null,
    error: null,
    loading: false,
    currentWeather: null,
    lastGeoDataFetchedAt: null,
    lastForecastFetchedAt: null,
    listLocations: [],
    listForecasts: null,
  }),

  actions: {
    isCacheValid(): boolean {
      if (!this.lastGeoDataFetchedAt) return false;
      return (
        Date.now() - this.lastGeoDataFetchedAt <
        CACHE_DURATION_MINUTES * 60 * 1000
      );
    },

    async fetchGetLocations(cityName: string) {
      try {
        const data: Location[] = await getLocations(cityName);
        //привожу к более универсальному типу - в частности, меняю ё на е для упрощенного поиска
        const normalize = (str: string | undefined | null): string =>
          str?.trim().toLowerCase().replace(/ё/g, "е") || "";
        this.listLocations = data.filter(
          (item: Location) =>
            normalize(item.name) === normalize(cityName) ||
            normalize(item.local_names?.ru) === normalize(cityName),
        );
      } catch (error: any) {
        console.error(error);
        this.error = error.message;
        throw error;
      }
    },

    async fetchGeoData() {
      if (this.isCacheValid()) return;

      this.loading = true;
      this.error = null;

      try {
        const ipData = await getIp();
        this.ip = ipData.ip;

        //проверка, определяется ли IP
        if (!this.ip) {
          this.error = "IP не определён";
          this.loading = false;
          return;
        }

        const geoData = await getGeoByIp(this.ip);
        this.city = geoData.city;
        this.country = geoData.country_code;

        //проверка определен ли город или страна
        if (!this.city || !this.country) {
          this.error = "Город не определён";
          this.loading = false;
          return;
        }
        //после всех проверок отправляю запрос на получение текущей погоды
        const weatherData = await getCurrentWeather(this.city, this.country);
        this.currentWeather = weatherData;
        this.id = weatherData.id;
        this.city = weatherData.name;
        this.country = weatherData.sys.country;
        this.lastGeoDataFetchedAt = Date.now();
        this.error = null;
      } catch (err: any) {
        console.error("Failed to fetch city:", err);
        this.error = err.message || "Не удалось определить ваше местоположение";
        this.ip = null;
        this.city = null;
        this.country = null;
        this.currentWeather = null;
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async fetchFindCityWeather(cityName: string, countryCode?: string) {
      //проверка, есть ли название города - нужна, так как функция getCurrentWeather ожидает string.
      if (!cityName || cityName.trim() === "") {
        this.error = "Введите название города";
        return;
      }

      if (countryCode === undefined) {
        countryCode = "";
      }

      this.loading = true;
      this.id = null;
      this.error = null;
      this.city = null;
      this.currentWeather = null;
      this.lastForecastFetchedAt = null;

      try {
        const weatherData = await getCurrentWeather(cityName, countryCode);
        if (weatherData.cod === 404)
          throw new Error("Город не найден. Проверьте название");

        this.id = weatherData.id;
        this.city = weatherData.name;
        this.country = weatherData.sys.country;
        this.currentWeather = weatherData;

        //далее вызываю функцию для получения прогноза на ближайшие 5 дней
        await this.fetchWeatherForecast();
      } catch (err: any) {
        console.error("Failed to fetch city:", err);
        this.error =
          err.message || "Не удалось получить погоду для этого города";
        this.city = null;
        this.currentWeather = null;
      } finally {
        this.loading = false;
      }
    },

    async fetchWeatherForecast() {
      if (
        this.lastForecastFetchedAt &&
        Date.now() - this.lastForecastFetchedAt <
          CACHE_DURATION_MINUTES * 60 * 1000
      ) {
        return; // Кэш свежий
      }

      this.loading = true;

      try {
        //проверка, есть ли название города или страны - нужна, так как функция getForecastWeather ожидает string.
        if (!this.city || !this.country) {
          this.error = "Город или страна не заданы";
          return;
        }
        this.listForecasts = await getForecastWeather(this.city, this.country);
        this.lastForecastFetchedAt = Date.now();
      } catch (err: any) {
        console.error("Failed to forecast:", err);
        this.error =
          err.message || "Не удалось получить данные о прогнозе погоды";
        this.ip = null;
        this.city = null;
        this.country = null;
      } finally {
        this.loading = false;
      }
    },
  },
});

export type DestinationStoreType = ReturnType<typeof useDestinationStore>;
