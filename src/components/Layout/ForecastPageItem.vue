<template>
  <block-wrap v-if="forecast">
    <div class="forecast-card">
      <h2 class="forecast-date">{{ formatDate(forecast.dt_txt) }}</h2>

      <div class="weather-main">
        <img
            :src="weatherIconUrl(forecast.weather[0].icon)"
            :alt="forecast.weather[0].description"
        />
        <p class="description">{{ forecast.weather[0].description }}</p>
      </div>

      <ul class="forecast-details">
        <li>
          <span>Температура:</span>
          {{Math.round(forecast.main.temp) }}°C
          <small>(ощущается как {{Math.round(forecast.main.feels_like)}}°C)</small>
        </li>
        <li>
          <span>Ветер:</span>
          {{ forecast.wind.speed }} м/с, {{ windDirection(forecast.wind.deg) }}
        </li>
        <li>
          <span>Влажность:</span>
          {{ forecast.main.humidity }}%
        </li>
        <li>
          <span>Давление:</span>
          {{ pressureMmHg(forecast.main.pressure) }} мм рт. ст.
        </li>
        <li>
          <span>Облачность:</span>
          {{ forecast.clouds.all }}%
        </li>
      </ul>
    </div>
  </block-wrap>

  <block-wrap v-else>
    <p>Прогноз не найден.</p>
  </block-wrap>
</template>

<script>
import BlockWrap from "@/components/Common/BlockWrap.vue";
import { useDestinationStore } from "@/store/DestinationStore";

export default {
  name: "ForecastPageItem",
  components: { BlockWrap },
  props: {
    slug: { type: String, required: true }
  },
  computed: {
    destinationStore() {
      return useDestinationStore();
    },
    listForecasts() {
      return this.destinationStore.listForecasts.list;
    },
    forecast() {
      if (!this.listForecasts || this.listForecasts.length === 0) {
        return null
      }
      const dtTxt = this.slugToDtTxt(this.slug);
      return this.listForecasts.find(elem => elem.dt_txt === dtTxt);
    }
  },
  methods: {
    slugToDtTxt(slug) {
      return slug.slice(0, 10) + ' ' + slug.slice(11);
    },
    formatDate(dateStr) {
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      return new Date(dateStr).toLocaleDateString('ru-RU', options);
    },
    windDirection(deg) {
      const dirs = ['северный', 'северо-восточный', 'восточный', 'юго-восточный', 'южный', 'юго-западный', 'западный', 'северо-западный'];
      const index = Math.round(deg / 45) % 8;
      return dirs[index];
    },
    pressureMmHg(hPa) {
      return Math.round(hPa * 0.75006);
    },
    weatherIconUrl(iconCode) {
      return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    }
  }
};
</script>
<style lang="scss" scoped>
.forecast-card {
  background-color: $white_color;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  color: $gray_color;
  max-width: 620px;
  width: 100%;
  margin: 0 auto;

  .forecast-date {
    color: $main_color;
    font-size: 20px;
    margin-bottom: 15px;

    &::first-letter{
      text-transform: uppercase;
    }
  }

  .weather-main {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    margin-bottom: 20px;

    img {
      width: 60px;
      height: 60px;
    }

    .description {
      font-size: 18px;
      color: $additional_color;
      text-transform: capitalize;
    }
  }

  .forecast-details {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 10px;
      font-size: 16px;

      span {
        color: $main_color;
        font-weight: bold;
        margin-right: 5px;
      }

      small {
        color: $light_color;
        margin-left: 5px;
      }
    }
  }
}
</style>