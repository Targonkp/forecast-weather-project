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
                listLocations: []
            }
        },
        actions: {
            isCacheValid(){
                if (!this.lastGeoDataFetchedAt)
                    return false;

                const current_time = Date.now();
                const catch_duration = CACHE_DURATION_MINUTES * 60 * 1000;
                //Прошло ли с момента загрузки меньше времени, чем длительность кеша
                //Если true - Кеш ещё свежий → можно использовать старые данные → не грузить заново.
                //Если false - Кеш устарел → нужно загрузить новые данные.
                return current_time - this.lastGeoDataFetchedAt < catch_duration;
            },
            fetchGetLocations(cityName){
                return fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=36b59a428ae07106b683317f19604659`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        // поиск точных  совпадений в названиях и только потом добавляю в отдельный массив, объявленный ранее
                        //поиск как в английской, так и в русской версии
                        this.listLocations = data.filter(item =>
                            item.name?.trim().toLowerCase() === cityName.trim().toLowerCase() ||
                            item.local_names?.ru?.trim().toLowerCase() === cityName.trim().toLowerCase()
                        );
                    })
                    .catch(error => {
                        console.error(error);
                        // Можно также сохранить ошибку в состояние, если нужно:
                        this.error = error.message;
                        throw error; // пробрасываем ошибку, чтобы вызывающий код мог её обработать
                    });
            },
            fetchGeoData(){
                if (this.isCacheValid()){
                    return;
                }
                this.loading = true;
                //получение текущего IP-адреса
                fetch("https://api.ipify.org?format=json")
                    .then(res =>
                        {
                            if (!res.ok){
                                throw new Error(`IP API error:: ${res.status}`)
                            }
                            return res.json()
                        }
                    )
                    .then(data => {
                            this.ip = data.ip;
                            //получение географических данных по ip
                            return fetch(`https://ipwho.is/${this.ip}`)
                        }
                    )
                    .then(res =>
                        {
                            if (!res.ok){
                                throw new Error(`Geo API error:: ${res.status}`)
                            }
                            return res.json()
                        }
                    )
                    .then(data => {
                            this.city = data.city;
                            //получение текущего прогноза
                            return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apiKey}&lang=ru&units=metric`)
                        }
                    )
                    .then(res =>
                        {
                            if (!res.ok){
                                throw new Error(`Weather API error:: ${res.status}`)
                            }
                            return res.json()
                        }
                    )
                    .then(data => {
                        this.currentWeather = data;
                        //Время успешной загрузки
                        this.lastGeoDataFetchedAt = Date.now();
                    })
                    .catch(err => {
                        console.error('Failed to fetch city:', err);
                        this.error = err.message || 'Не удалось определить ваше местоположение'
                        this.ip = null;
                        this.city = null;
                        this.country = null;
                    })
                    .finally(() => this.loading = false)
            },
            fetchFindCityWeather(cityName, countryCode){
                if (!cityName || cityName.transfer === ""){
                    this.error = 'Введите название города';
                    return;
                }

                this.loading = true;
                this.error = null;
                this.city = null;
                this.currentWeather = null;

                //Запрос погоды по введенному городу
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&appid=${apiKey}&lang=ru&units=metric`)
                    .then(res =>
                    {
                        if (!res.ok){
                            throw new Error(`Weather API error - City search: ${res.status}`)
                        }
                        return res.json()
                    })
                .then(data => {
                    //проверка на ошибку 404 - если город не найден
                    if (data.cod === "404"){
                        throw new Error('Город не найден. Проверьте название')
                    }
                    this.city = data.name;
                    this.currentWeather = data;
                    this.lastGeoDataFetchedAt = Date.now();
                })
                    .catch(err => {
                        console.error('Failed to fetch city:', err);
                        this.error = err.message || 'Не удалось получить погоду для этого города';
                        this.city = null;
                        this.currentWeather = null;
                    })
                    .finally(() => this.loading = false)
            },
        },
    }
)