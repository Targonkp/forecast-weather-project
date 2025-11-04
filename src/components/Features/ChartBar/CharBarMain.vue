<template>
  <div class="main-chart-wrap">
    <chart-bar-component :header="'температура'" :chartData="chartDataTemp" :options="chartOptionsTemp" />
    <chart-bar-component :header="'скорость ветра'" :chartData="chartDataWind" :options="chartOptionsWind" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ChartBarComponent from "@/components/Features/ChartBar/ChartBarComponent.vue";
import { type DestinationStoreType, useDestinationStore } from "@/store/DestinationStore";
import { ForecastListItem } from "@/interfaces/forecast";

export default defineComponent({
  name: "CharBarMain",
  components: { ChartBarComponent },
  computed: {
    destinationStore(): DestinationStoreType {
      return useDestinationStore();
    },
    chartDataTemp() {
      //получаю и обрабатываю массив прогнозов
      const forecasts: ForecastListItem[] = this.destinationStore.listForecasts?.list || [];

      const temperatures = forecasts.map((item: ForecastListItem) => Math.round(item.main.temp));

      const labels = forecasts.map((item: ForecastListItem) => {
        let newDateTime = item.dt_txt.slice(0, 16);
        let [yearPart, timePart] = newDateTime.split(" ");
        let [year, month, day] = yearPart.split("-");
        let shortYear = year.slice(2);

        return `${day}.${month}.${shortYear} ${timePart}`;
      });

      return {
        labels,
        datasets: [
          {
            label: "Температура",
            backgroundColor: "#f87979",
            borderWidth: 1,
            borderColor: "rgba(60,4,4,0.5)",
            data: temperatures,
            fill: false,
            tension: 0.2,
          },
        ],
      };
    },
    chartOptionsTemp() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        //чтобы сделать плюсовые значения, если больше 0, так как data принимает только числовые значения
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context: any) {
                const value = context.parsed.y;
                return value > 0 ? `+${value}°C` : `${value}°C`;
              },
            },
          },
        },
      };
    },
    chartDataWind() {
      //получаю и обрабатываю массив прогнозов
      const forecasts: ForecastListItem[] = this.destinationStore.listForecasts?.list || [];

      const wind_speed = forecasts.map((item: ForecastListItem) => Math.round(item.wind.speed));

      const labels = forecasts.map((item: ForecastListItem) => {
        let newDateTime = item.dt_txt.slice(0, 16);
        let [yearPart, timePart] = newDateTime.split(" ");
        let [year, month, day] = yearPart.split("-");
        let shortYear = year.slice(2);

        return `${day}.${month}.${shortYear} ${timePart}`;
      });

      return {
        labels,
        datasets: [
          {
            label: "Скорость ветра",
            backgroundColor: "#4347ac",
            borderWidth: 1,
            borderColor: "rgb(0,0,12)",
            data: wind_speed,
            fill: false,
            tension: 0.2,
          },
        ],
      };
    },
    chartOptionsWind() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context: any) {
                const value = context.parsed.y;
                return value + " м/с";
              },
            },
          },
        },
      };
    },
  },
});
</script>

<style scoped lang="scss">
.main-chart-wrap {
  margin: 30px 0 10px 0;
}
</style>
