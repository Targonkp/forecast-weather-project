<template>
    <div class="forecasts-list-wrap">
      <div v-if="listForecasts && listForecasts.length" class="forecasts-list-wrap">
        <h1 class="forecasts-header">Прогноз погоды на 5 дней - {{cityName}}</h1>
        <div class="forecasts-list">
          <Carousel aria-label="Карусель с прогнозом на 5 дней - каждые 3 часа" v-bind="carouselConfig">
            <Slide
                v-for="forecast in listForecasts"
                :key="forecast.dt"
            >
              <router-link
                 class="additional-router-class"
                :to="{name: 'Forecast.show', params:{slug:slugForecast(forecast.dt_txt)}}"
              >
                <forecast-slide-item :forecast="forecast"/>
              </router-link>
            </Slide>
            <template #addons>
              <Navigation />
              <Pagination class="addition-pagination" />
            </template>
          </Carousel>
        </div>
      </div>
      <div v-else-if="loading" class="loading-container">
        <div class="spinner"></div>
        <p>Загружаем данные о погоде...</p>
      </div>
      <div v-else class="no-data">Нет данных о погоде</div>
      <chart aria-label="Отображение подробного прогноза в виде графика" />
    </div>

</template>

<script>
import { useDestinationStore } from "@/store/DestinationStore";
import ForecastSlideItem from "@/components/Features/ForecastSlideItem.vue";
import { Carousel, Slide, Navigation, Pagination } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import ChartBar from "@/components/Features/ChartBar.vue";

export default {
  name: 'Forecast',
  components: {
    ForecastSlideItem,
    Chart: ChartBar, ForecastItem: ForecastSlideItem, Carousel, Slide, Navigation, Pagination},
  data(){
    return {
      carouselConfig: {
        breakpointMode: 'carousel',
        snapAlign: 'center',
        breakpoints: {
          0:{
            itemsToShow: 'auto',
            snapAlign: 'center'
          },
          480:{
            itemsToShow: 'auto',
            snapAlign: 'start'
          }
        },
        transition: 350,
        mouseWheel: true,
        gap: 20,
        i18n: {
          ariaNextSlide: 'К следующему слайду',
          ariaPreviousSlide: 'К предыдущему слайду'
        }
      }
    }
  },
  methods: {
    slugForecast(item) {
      const val = item.split(' ');
      return val[0] + '-' + val[1];
    }
  },
  computed: {
    destinationStore() {
      return useDestinationStore();
    },
    loading() {
      return this.destinationStore.loading;
    },
    cityName(){
      return this.destinationStore.listForecasts.city.name;
    },
    listForecasts(){
      return this.destinationStore.listForecasts.list;
    },
  },
}
</script>

<style lang="scss" scoped>
  .additional-router-class {
    text-decoration: none;
    color: inherit;
    height: 100%;
    display: block;
    width: 220px;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover{
      opacity: 0.8;
      transition: opacity 0.2s;
    }

    @include medium{
      max-width: 200px;
    }

    @include small{
      max-width: 180px;

      &:hover{
        opacity: 1;
      }
    }
  }

  .forecasts-list-wrap{
    width: 100%;
    overflow: hidden;
  }

  .forecasts-header{
    margin: 14px 0;
  }

  //глубокий селектор - чотбы пробросить стили вглубль дочернего компонента
  :deep(.carousel__prev),
  :deep(.carousel__next) {
    background: #bfaeae;
    border-radius: 50%;
  }

  :deep(.carousel__pagination-button){
    height: 7px;
    width: 20px;
    border-radius: 3px;
  }

  :deep(.carousel__pagination){
    bottom: 0;
  }

  :deep(.carousel__viewport){
    padding: 0 0 28px 0;
  }

  :deep(.carousel__pagination){
    flex-wrap: wrap;
    width: 100%;
    bottom: 0;
  }

  /* Загрузка */
  .loading-container {
    text-align: center;
    color: #ffffff;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid rgba(255, 255, 255, 0.3);
      border-top: 4px solid white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  }

  .addition-pagination{
    display: flex;

    @media (max-width: 768px){
      display: none;
    }
  }
</style>