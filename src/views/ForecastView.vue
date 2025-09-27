<template>
  <Header/>
  <Main>
    <div class="forecasts-list-wrap">
      <h1 class="forecasts-header">Прогноз погоды на 5 дней - {{cityName}}</h1>
      <div class="forecasts-list">
      <forecast-item
          v-for="forecast in listForecasts"
          :key="forecast.date"
          :forecast="forecast"
      />
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

export default {
  name: 'Forecast',
  components: {ForecastItem, Footer, Header, Main},
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
    display: flex;
  }

  .forecasts-header{
    font-size: 42px;
    line-height: 120%;
    margin: 8px 0 14px 0;
  }
</style>