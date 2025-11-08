<template>
  <div class="main-chart-wrap">
    <div class="switch-parameters-wrap">
      <div class="switch-parameters__item">
        <span>Температура</span>
        <app-switch v-model="temp" switch-color="#f87979" />
      </div>
      <div class="switch-parameters__item">
        <span>По ощущениям</span>
        <app-switch v-model="temp_feel" switch-color="#4dc34d" />
      </div>
      <div class="switch-parameters__item">
        <span>Скорость ветра</span>
        <app-switch v-model="wind" switch-color="#4347ac" />
      </div>
    </div>
    <chart-bar-component
      v-if="temp"
      :header="'температура'"
      :chartData="chartDataTemp"
      :options="chartOptionsTemp"
    />
    <chart-bar-component
      v-if="temp_feel"
      :header="'температура по ощущению'"
      :chartData="chartDataFeelTemp"
      :options="chartOptionsFeelTemp"
    />
    <chart-bar-component
      v-if="wind"
      :header="'скорость ветра'"
      :chartData="chartDataWind"
      :options="chartOptionsWind"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ChartBarComponent from "@/components/Features/ChartBar/ChartBarComponent.vue";
import { type DestinationStoreType, useDestinationStore } from "@/store/DestinationStore";
import { ForecastListItem } from "@/interfaces/forecast";
import AppSwitch from "@/components/UI/AppSwitch.vue";

export default defineComponent({
  name: "CharBarMain",
  components: { AppSwitch, ChartBarComponent },
  data() {
    return {
      temp: true as boolean,
      temp_feel: true as boolean,
      wind: false as boolean,
    };
  },
  computed: {
    destinationStore(): DestinationStoreType {
      return useDestinationStore();
    },
    labelsTransform() {
      const forecasts: ForecastListItem[] = this.destinationStore.listForecasts?.list || [];

      //форматирую время для подписи в label
      return forecasts.map((item: ForecastListItem) => {
        let newDateTime = item.dt_txt.slice(0, 16);
        let [yearPart, timePart] = newDateTime.split(" ");
        let [year, month, day] = yearPart.split("-");
        let shortYear = year.slice(2);
        return `${day}.${month}.${shortYear} ${timePart}`;
      });
    },

    chartDataTemp() {
      //получаю и обрабатываю массив прогнозов
      const forecasts: ForecastListItem[] = this.destinationStore.listForecasts?.list || [];

      const temperatures = forecasts.map((item: ForecastListItem) => Math.round(item.main.temp));

      const labels = this.labelsTransform;

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
        scales: {
          y: {
            grid: {
              color: "#ae9494",
            },
          },
          x: {
            grid: {
              display: false,
              color: "#ae9494",
            },
          },
        },
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
          legend: {
            labels: {
              font: {
                size: 20,
                weight: "bold",
              },
            },
          },
        },
      };
    },
    chartDataFeelTemp() {
      //получаю и обрабатываю массив прогнозов
      const forecasts: ForecastListItem[] = this.destinationStore.listForecasts?.list || [];

      const temperatures = forecasts.map((item: ForecastListItem) => Math.round(item.main.feels_like));

      const labels = this.labelsTransform;

      return {
        labels,
        datasets: [
          {
            label: "Температура по ощущению",
            backgroundColor: "#4dc34d",
            borderWidth: 1,
            borderColor: "rgba(13,41,23,0.5)",
            data: temperatures,
            fill: false,
            tension: 0.2,
          },
        ],
      };
    },
    chartOptionsFeelTemp() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            grid: {
              color: "#126c12",
            },
          },
          x: {
            grid: {
              display: false,
              color: "#126c12",
            },
          },
        },
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
          legend: {
            labels: {
              font: {
                size: 20,
                weight: "bold",
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

      const labels = this.labelsTransform;

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
        scales: {
          y: {
            grid: {
              color: "#87CEFA",
            },
          },
          x: {
            grid: {
              display: false,
              color: "#87CEFA",
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context: any) {
                const value = context.parsed.y;
                return value + " м/с";
              },
            },
          },
          legend: {
            labels: {
              font: {
                size: 20,
                weight: "bold",
              },
            },
          },
        },
      };
    },
  },
  methods: {
    takeValue(value: boolean) {
      this.temp = value;
    },
  },
});
</script>

<style scoped lang="scss">
.main-chart-wrap {
  margin: 30px 0 10px 0;
}

.switch-parameters {
  &-wrap {
    margin: 16px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 300px;
    width: 100%;
  }

  &__item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      flex-basis: 120px;
      text-align: left;
    }
  }
}
</style>
