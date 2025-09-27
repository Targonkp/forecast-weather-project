import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Главная — Текущая погода',
      description: 'Проверьте текущую погоду в вашем городе. Точная и актуальная информация о погоде в реальном времени.'
    }
  },
  {
    path: '/forecast',
    name: 'forecast',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ForecastView.vue'),
    meta: {
      title: 'Прогноз погоды на 5 дней',
      description: 'Подробный прогноз погоды на ближайшие дни: температура, осадки, ветер и другие метеорологические данные.'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  //обновление title
  document.title = to.meta.title || 'Прогноз погоды';
  //обновление или создаение meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    document.head.appendChild(metaDescription);
  }
  // устанавка содержимого
  metaDescription.content = to.meta.description || 'Актуальная погода и прогнозы.';
  next();
})

export default router
