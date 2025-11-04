<template>
  <div>
    <chart-bar-component :chartData="chartData" />
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
    chartData() {
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
  },
});
</script>

<style scoped lang="scss"></style>
