import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
//глобальные стили - шрифты, общие отступы и прочее
import "./assets/styles/global.scss";
import {useDestinationStore} from "@/store/DestinationStore";

const app = createApp(App)
const pinia = createPinia()

app.use(pinia).use(router).mount('#app')
