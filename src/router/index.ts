import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Главная — Текущая погода",
      description:
        "Проверьте текущую погоду в вашем городе. Точная и актуальная информация о погоде в реальном времени.",
    },
  },
  {
    path: "/forecast/",
    name: "Forecast",
    component: () => import(/* webpackChunkName: "forecast" */ "@/views/Forecast.vue"),
    meta: {
      title: "Прогноз погоды на 5 дней",
      description:
        "Подробный прогноз погоды на ближайшие дни: температура, осадки, ветер и другие метеорологические данные.",
    },
  },
  {
    path: "/forecast/:slug",
    name: "Forecast.show",
    component: () => import("@/components/Features/Forecast/ForecastPageItem.vue"),
    meta: {
      title: "Прогноз погоды",
      description:
        "Подробный прогноз погоды на ближайшие дни: температура, осадки, ветер и другие метеорологические данные.",
    },
    props: true,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import(/* webpackChunkName: "notfound" */ "../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  //обновление title
  document.title = (to.meta.title as string) || "Прогноз погоды";
  //обновление или создаение meta description
  let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
  if (!metaDescription) {
    metaDescription = document.createElement("meta") as HTMLMetaElement;
    metaDescription.name = "description";
    document.head.appendChild(metaDescription);
  }
  // устанавка содержимого
  metaDescription.content = (to.meta.description as string) || "Актуальная погода и прогнозы.";
  next();
});

export default router;
