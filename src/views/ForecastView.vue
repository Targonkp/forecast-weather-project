<template>
  <Header/>
  <Main>
    <div class="forecasts-list-wrap">
      <h1 class="forecasts-header">Прогноз погоды на 5 дней - {{cityName}}</h1>
      <div class="forecasts-list">
      <Carousel
          :items-to-show="1.5"
          :wrap-around="false"
          breakpointMode="carousel"
          snap-align="center"
          :breakpoints="breakpoints"
          :transition="350"
          :gap="20"
          class="forecasts-carousel"
      >
        <Slide
            v-for="forecast in listForecasts"
            :key="forecast.date"
        >
          <forecast-item :forecast="forecast"/>
        </Slide>
        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
      </div>
    </div>
  </Main>
  <Footer/>
</template>

<script>
import Header from "@/components/Common/Header.vue";
import Footer from "@/components/Common/Footer.vue";
import Main from "@/components/Common/Main.vue";
import { useDestinationStore } from "@/store/DestinationStore";
import ForecastItem from "@/components/Layout/ForecastItem.vue";
import { Carousel, Slide, Navigation, Pagination } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

export default {
  name: 'Forecast',
  components: {ForecastItem, Footer, Header, Main, Carousel, Slide, Navigation, Pagination},
  data(){
    return {
      breakpoints: {
        380: {
          itemsToShow: 2,
          snapAlign: 'start'
        },
        576: {
          itemsToShow: 3,
          snapAlign: 'start'
        },
        768: {
          itemsToShow: 4,
          snapAlign: 'start'
        },
        1024: {
          itemsToShow: 5,
          snapAlign: 'start'
        },
        1200: {
          itemsToShow: 6,
          snapAlign: 'start'
        },
        1600: {
          itemsToShow: 7,
          snapAlign: 'start'
        },
      }
    }
  },
  computed: {
    destinationStore() {
      return useDestinationStore();
    },
    cityName(){
      return this.destinationStore.listForecasts.city.name;
    },
    listForecasts(){
      return this.destinationStore.listForecasts.list;
    }
  }
}
</script>

<style lang="scss" scoped>
  .forecasts-list-wrap{
    width: 100%;
    overflow: hidden;
  }

  .forecasts-list{
    cursor: pointer;
  }

  .forecasts-header{
    font-size: 42px;
    line-height: 120%;
    margin: 8px 0 14px 0;
  }
</style>