import { defineStore } from "pinia";
import {
    getLocations,
    getIp,
    getGeoByIp,
    getCurrentWeather,
    getForecastWeather
} from "@/api/weatherApi";

const CACHE_DURATION_MINUTES = 10;

export const useDestinationStore = defineStore("DestinationStore", {
    state: () => ({
        ip: null,
        city: null,
        country: null,
        error: null,
        loading: false,
        currentWeather: null,
        lastGeoDataFetchedAt: null,
        lastForecastFetchedAt: null,
        listLocations: [],
        listForecasts: [],
    }),

    actions: {
        isCacheValid() {
            if (!this.lastGeoDataFetchedAt) return false;
            return Date.now() - this.lastGeoDataFetchedAt < CACHE_DURATION_MINUTES * 60 * 1000;
        },

        async fetchGetLocations(cityName) {
            try {
                const data = await getLocations(cityName);
                const normalize = (str) => str?.trim().toLowerCase().replace(/ё/g, 'е') || '';
                this.listLocations = data.filter(item =>
                    normalize(item.name) === normalize(cityName) ||
                    normalize(item.local_names?.ru) === normalize(cityName)
                );
            } catch (error) {
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

                const geoData = await getGeoByIp(this.ip);
                console.log(geoData);
                this.city = geoData.city;
                this.country = geoData.country_code;

                const weatherData = await getCurrentWeather(this.city, this.country);
                this.currentWeather = weatherData;
                this.city = weatherData.name;
                this.country = weatherData.sys.country;
                this.lastGeoDataFetchedAt = Date.now();
                this.error = null;
            } catch (err) {
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

        async fetchFindCityWeather(cityName, countryCode) {
            if (!cityName || cityName.trim() === "") {
                this.error = "Введите название города";
                return;
            }

            this.loading = true;
            this.error = null;
            this.city = null;
            this.currentWeather = null;
            this.lastForecastFetchedAt = null;

            try {
                const weatherData = await getCurrentWeather(cityName, countryCode);
                if (weatherData.cod === "404") throw new Error("Город не найден. Проверьте название");

                this.city = weatherData.name;
                this.country = weatherData.sys.country;
                this.currentWeather = weatherData;

                await this.fetchWeatherForecast(); // вызываем следом
            } catch (err) {
                console.error("Failed to fetch city:", err);
                this.error = err.message || "Не удалось получить погоду для этого города";
                this.city = null;
                this.currentWeather = null;
            } finally {
                this.loading = false;
            }
        },

        async fetchWeatherForecast() {
            if (
                this.lastForecastFetchedAt &&
                (Date.now() - this.lastForecastFetchedAt) < CACHE_DURATION_MINUTES * 60 * 1000
            ) {
                return; // Кэш свежий
            }

            this.loading = true;

            try {
                const data = await getForecastWeather(this.city, this.country);
                this.listForecasts = data;
                this.lastForecastFetchedAt = Date.now();
            } catch (err) {
                console.error("Failed to forecast:", err);
                this.error = err.message || "Не удалось получить данные о прогнозе погоды";
                this.ip = null;
                this.city = null;
                this.country = null;
            } finally {
                this.loading = false;
            }
        }
    }
});