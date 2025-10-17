<template>
  <div class="chart-container">
    <h2 class="chart-header">Температура в виде графика</h2>
    <div class="chart-scroll-wrapper">
      <div class="chart-wrap">
        <Bar :data="chartData" :options="options" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { type DestinationStoreType, useDestinationStore } from "@/store/DestinationStore";
import { ForecastListItem } from "@/interfaces/forecast";
import { defineComponent } from "vue";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

import { Bar } from "vue-chartjs";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default defineComponent({
  name: "ChartBar",
  components: {
    Bar,
  },
  data() {
    return {
      options: {
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
      },
    };
  },
  computed: {
    // Получение данных из Pinia-хранилища
    destinationStore(): DestinationStoreType {
      return useDestinationStore();
    },
    // Готовые данные для графика
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

<style lang="scss" scoped>
.chart-container {
  margin: 12px 0 8px 0;
}

.chart-scroll-wrapper {
  margin: 20px 0;
  overflow-x: auto;
  width: 100%;
}

.chart-wrap {
  aspect-ratio: 3 / 1;
  min-width: 800px;
  position: relative;
}

.chart-wrap canvas {
  width: 100% !important;
  height: 100% !important;
  display: block;
}
</style>
