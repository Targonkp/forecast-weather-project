import { createRouter, createWebHistory } from "vue-router";
import { useDestinationStore } from "@/store/DestinationStore";
import Home from "../views/Home.vue";
import { ForecastListItem } from "@/interfaces/forecast";

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
    //guard - валидация доступа к маршруту
    beforeEnter: (to: any, from: any, next: any) => {
      const list: ForecastListItem[] = useDestinationStore().listForecasts?.list || [];
      const slug: string = to.params.slug;
      const isValid: boolean = list.some((element: ForecastListItem) => {
        let el = element.dt_txt.split(" ");
        let res = el[0] + "-" + el[1];
        return res === slug;
      });
      if (isValid) {
        next();
      } else {
        next({ name: "NotFound" });
      }
    },
    meta: {
      title: "Прогноз погоды",
      description:
        "Подробный прогноз погоды на ближайшие дни: температура, осадки, ветер и другие метеорологические данные.",
    },
    props: true,
  },
  {
    path: "/map",
    name: "Map",
    component: () => import(/* webpackChunkName: "map" */ "@/views/Map.vue"),
    meta: {
      title: "Карта погоды",
      description: "Карта осадков, облачности, скорости ветра, температуры",
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
  //обновление или создание meta description
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
