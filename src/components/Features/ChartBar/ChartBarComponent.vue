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
import { defineComponent } from "vue";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

import { Bar } from "vue-chartjs";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default defineComponent({
  name: "ChartBarComponent",
  components: {
    Bar,
  },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
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
