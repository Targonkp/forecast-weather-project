import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
//глобальные стили - шрифты, общие отступы и прочее
import "./assets/styles/global.scss";
import {useDestinationStore} from "@/store/DestinationStore";

const app = createApp(App)
const pinia = createPinia()

app.use(pinia);

//автоматический запуск геолокации при старте проекта - для определения города пользователя и отображения его погоды
const weatherCurrentCity = useDestinationStore();

//первый запуск
weatherCurrentCity.fetchGeoData();

//обновлять каждые 10 минут
setInterval(() => {
    weatherCurrentCity.fetchGeoData();
    console.log('Погода обновлена')
}, 10 * 60 * 1000 + 1000)

app.use(router).mount('#app')
