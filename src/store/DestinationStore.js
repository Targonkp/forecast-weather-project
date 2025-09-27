import {defineStore} from "pinia";

const apiKey = process.env.VUE_APP_OPENWEATHER_API_KEY; //API ключ из env для получения погоды
const CACHE_DURATION_MINUTES = 10; //частота обновления кэша, чтобы запрос не отправлялся каждый раз при переходе на компонент с погодой


export const useDestinationStore = defineStore(
    "DestinationStore",
    {
        state: () => {
            return {
                ip: null,
                city: null,
                country: null,
                error: null,
                loading: false, //для загрузки
                currentWeather: null, //переменная для объекта, получаемого с openweather
                lastGeoDataFetchedAt: null, // время последнего успешного запроса
                lastForecastFetchedAt: null,
                listLocations: [], //список городов, подходящих под запрос
                listForecasts: [], //список с данными о прогнозе погоды
            }
        },
        actions: {
            isCacheValid() {
                if (!this.lastGeoDataFetchedAt)
                    return false;

                const current_time = Date.now();
                const catch_duration = CACHE_DURATION_MINUTES * 60 * 1000;
                //Прошло ли с момента загрузки меньше времени, чем длительность кеша
                //Если true - Кеш ещё свежий → можно использовать старые данные → не грузить заново.
                //Если false - Кеш устарел → нужно загрузить новые данные.
                return current_time - this.lastGeoDataFetchedAt < catch_duration;
            },
            fetchGetLocations(cityName) {
                return fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        // поиск точных  совпадений в названиях и только потом добавляю в отдельный массив, объявленный ранее
                        //поиск как в английской, так и в русской версии - без учёта буквы «ё»
                        const normalize = (str) => {
                            return str?.trim().toLowerCase().replace(/ё/g, 'е') || '';
                        };
                        this.listLocations = data.filter(item =>
                            normalize(item.name) === normalize(cityName) ||
                            normalize(item.local_names?.ru) === normalize(cityName)
                        );
                    })
                    .catch(error => {
                        console.error(error);
                        this.error = error.message;
                        throw error; // пробрасывание ошибки, чтобы вызывающий код мог её обработать
                    });
            },
            fetchGeoData() {
                if (this.isCacheValid()) {
                    return Promise.resolve();
                }
                this.loading = true;
                this.error = null; // сброс ошибки перед загрузкой
                return fetch("https://api.ipify.org?format=json")
                    .then(res => {
                        if (!res.ok) {
                            throw new Error(`IP API error:: ${res.status}`);
                        }
                        return res.json();
                    })
                    .then(data => {
                        this.ip = data.ip;
                        return fetch(`https://ipwho.is/${this.ip}`);
                    })
                    .then(res => {
                        if (!res.ok) {
                            throw new Error(`Geo API error:: ${res.status}`);
                        }
                        return res.json();
                    })
                    .then(data => {
                        this.city = data.city;
                        return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apiKey}&lang=ru&units=metric`);
                    })
                    .then(res => {
                        if (!res.ok) {
                            throw new Error(`Weather API error:: ${res.status}`);
                        }
                        return res.json();
                    })
                    .then(data => {
                        this.currentWeather = data;
                        this.city = data.name;
                        this.country = data.sys.country;
                        this.lastGeoDataFetchedAt = Date.now();
                        this.error = null; // при успехе сбрасываем ошибку
                    })
                    .catch(err => {
                        console.error('Failed to fetch city:', err);
                        this.error = err.message || 'Не удалось определить ваше местоположение';
                        this.ip = null;
                        this.city = null;
                        this.country = null;
                        this.currentWeather = null; // очистка данных при ошибке
                        throw err;
                    })
                    .finally(() => {
                        this.loading = false;  // обязательно менять loading в любом случае
                    });
            },
            fetchFindCityWeather(cityName, countryCode) {
                if (!cityName || cityName.trim() === "") {
                    this.error = 'Введите название города';
                    return;
                }
                this.loading = true;
                this.error = null;
                this.city = null;
                this.currentWeather = null;

                // Сброс последнего прогноза, чтобы гарантировать свежий запрос
                this.lastForecastFetchedAt = null;

                //Запрос погоды по введенному городу
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&appid=${apiKey}&lang=ru&units=metric`)
                    .then(res => {
                        if (!res.ok) {
                            throw new Error(`Weather API error - City search: ${res.status}`)
                        }
                        return res.json()
                    })
                    .then(data => {
                        //проверка на ошибку 404 - если город не найден
                        if (data.cod === "404") {
                            throw new Error('Город не найден. Проверьте название')
                        }
                        //обновляю данные в state
                        this.city = data.name;
                        this.country = data.sys.country;
                        this.currentWeather = data;
                        return this.fetchWeatherForecast();
                    })
                    .catch(err => {
                        console.error('Failed to fetch city:', err);
                        this.error = err.message || 'Не удалось получить погоду для этого города';
                        this.city = null;
                        this.currentWeather = null;
                    })
                    .finally(() => this.loading = false)
            },
            fetchWeatherForecast() {
                if (this.lastForecastFetchedAt && (Date.now() - this.lastForecastFetchedAt) < CACHE_DURATION_MINUTES * 60 * 1000) {
                    return Promise.resolve(); // Кэш свежий — не грузим заново
                }
                this.loading = true;

               return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.city},${this.country}&appid=${apiKey}&lang=ru&units=metric`)
                    .then(res => {
                            if (!res.ok) {
                                throw new Error(`Weather Forecast error:: ${res.status}`)
                            }
                            return res.json()
                        }
                    )
                    .then(data => {
                            this.listForecasts = data;
                            this.lastForecastFetchedAt = Date.now();
                            console.log(this.listForecasts)
                        }
                    )
                    .catch(err => {
                        console.error('Failed to forecast:', err);
                        this.error = err.message || 'Не удалось получить данные о прогнозе погоды'
                        this.ip = null;
                        this.city = null;
                        this.country = null;
                    })
                    .finally(
                        () => this.loading = false
                    )
            }
        },
    }
)