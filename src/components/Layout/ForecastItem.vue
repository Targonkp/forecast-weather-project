<template>
  <div class="forecast-item">
    <div class="date">{{ formatDate(forecast.dt_txt) }}</div>
    <div class="temp-wrap">
      <div class="temp">Температура: {{ Math.round(forecast.main.temp) }}°C</div>
      <div class="temp">По ощущению: {{ Math.round(forecast.main.feels_like) }}°C</div>
    </div>
    <div class="wind">Скорость ветра: {{ Math.round(forecast.wind.speed) }} м/с</div>
    <div class="description-wrap">
      <div class="description">{{ forecast.weather[0].description }}</div>
      <div class="image">
        <img :src="getWeatherIcon(forecast.weather[0].icon)" :alt="forecast.weather[0].description">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForecastItem',
  props: {
    forecast: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Неверная дата';
      }
      const options = {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      };
      return date.toLocaleString('ru-RU', options);
    },
    getWeatherIcon(iconCode) {
      // Пример: "01d" → https://openweathermap.org/img/wn/01d@2x.png
      return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    },
  }
}
</script>

<style lang="scss" scoped>
.forecast-item {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  background: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  color: $gray_color;
}

.date {
  font-weight: 600;
  white-space: nowrap;

  &::first-letter{
    text-transform: uppercase;
  }
}

.temp {
  font-size: 18px;
  font-weight: 600;
  color: $blue_color;
}

.temp-wrap{
  margin: 7px 0;
  padding: 5px 7px;
  background-color: rgba(74, 236, 61, 0.25);
  border-radius: 3px;
}

.description-wrap{
  display: flex;
  flex-direction: row;
  margin: 5px 0 2px 0;
  align-items: center;
  gap: 0 5px;
}

.description {
  font-style: italic;
  color: $gray_color;
}

.wind{
  font-size: 18px;
  font-weight: 600;
}

.image{
  width: 50px;

  img{
    display: block;
    width: 100%;
    height: auto;
  }
}
</style>