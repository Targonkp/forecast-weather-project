<template>
  <div class="main-block">
    <!-- Загрузка -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p>Загружаем данные о погоде...</p>
    </div>

    <!-- Ошибка -->
    <div v-else-if="error" class="error-card">
      <span class="error-icon">⚠️</span>
      <p>Данные не найдены - неправильное название города</p>
    </div>

    <!-- Данные погоды -->
    <div v-else-if="currentWeather" class="weather-card">
      <div class="weather-header">
        <h1 class="city-name">{{ currentWeather.name }}, {{ currentWeather.sys.country }}</h1>
        <div class="weather-icon">
          <img :src="getWeatherIcon(currentWeather.weather[0].icon)" :alt="currentWeather.weather[0].description" />
        </div>
      </div>

      <div class="temperature">
        <span class="temp-value">{{ Math.round(currentWeather.main.temp) }}°C</span>
        <span class="feels-like">По ощущению: {{ Math.round(currentWeather.main.feels_like) }}°C</span>
      </div>

      <div class="weather-details">
        <div class="detail-item">
          <span class="label">Погода</span>
          <span class="value">{{ currentWeather.weather[0].description }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Влажность</span>
          <span class="value">{{ currentWeather.main.humidity }}%</span>
        </div>
        <div class="detail-item">
          <span class="label">Ветер</span>
          <span class="value">{{ Math.round(currentWeather.wind.speed) }} м/с</span>
        </div>
        <div class="detail-item">
          <span class="label">Давление</span>
          <span class="value">{{ (currentWeather.main.pressure * 0.750062).toFixed(0) }} мм рт. ст.</span>
        </div>
        <div class="detail-item">
          <span class="label">Видимость</span>
          <span class="value">{{ (currentWeather.visibility / 1000) }} км</span>
        </div>
      </div>

      <div class="weather-footer">
        <span>Данные обновлены автоматически</span>
      </div>
    </div>
  </div>
</template>

<script>
import { useDestinationStore } from "@/store/DestinationStore";

export default {
  name: "CityShow",
  computed: {
    destinationStore() {
      return useDestinationStore();
    },
    loading() {
      return this.destinationStore.loading;
    },
    city() {
      return this.destinationStore.city;
    },
    error() {
      return this.destinationStore.error;
    },
    country() {
      return this.destinationStore.country;
    },
    currentWeather() {
      return this.destinationStore.currentWeather;
    }
  },
  methods: {
    getWeatherIcon(iconCode) {
      // Пример: "01d" → https://openweathermap.org/img/wn/01d@2x.png
      return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    },
  },
  watch: {
    currentWeather(newValue) {
      console.log("Обновлена погода:", newValue);
    }
  },
};
</script>

<style lang="scss" scoped>
.main-block {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  border-radius: 10px;
  background: url("/public/autumn.png") center center / cover no-repeat;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Загрузка */
.loading-container {
  text-align: center;
  color: white;
  font-size: 1.2rem;
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

/* Ошибка */
.error-card {
  text-align: center;
  color: #dc3545;
  background-color: #f8d7da;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(220, 53, 69, 0.2);
  font-size: 1.2rem;
  max-width: 400px;

  .error-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
}

/* Карточка погоды */
.weather-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  animation: fadeInUp 0.8s ease-out;
  max-width: 500px;
  width: 100%;
  color: #333;

  .weather-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;

    .city-name {
      font-size: 2rem;
      font-weight: 700;
      color: #2c3e50;
      margin: 0;
      flex: 1;
      text-align: left;
    }

    .weather-icon img {
      width: 80px;
      height: 80px;
      filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
    }
  }

  .temperature {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px 0;

    .temp-value {
      font-size: 54px;
      font-weight: 800;
      background: linear-gradient(to right, #e74c3c, #c0392b);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      line-height: 1;
    }

    .feels-like {
      font-size: 18px;
      color: #7f8c8d;
      margin-top: 8px;
    }
  }

  .weather-details {
    margin-bottom: 18px;
    text-align: left;

    .detail-item {
      display: flex;
      justify-content: space-between;
      padding: 14px 0;
      border-bottom: 1px solid #ecf0f1;

      &:last-child {
        border-bottom: none;
      }

      .label {
        font-weight: 600;
        color: #34495e;
        font-size: 18px;
      }

      .value {
        font-weight: 500;
        color: #2c3e50;
        font-size: 18px;
      }
    }
  }

  .weather-footer {
    color: #7f8c8d;
    font-size: 14px;
    margin-top: 24px;
  }
}

/* Анимация появления */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Адаптивность */
@media (max-width: 600px) {
  .main-block {
    padding: 16px;
  }

  .weather-card {
    padding: 30px;
  }

  .weather-header {
    flex-direction: column;
    gap: 16px;
  }

  .city-name {
    font-size: 30px;
  }

  .temp-value {
    font-size: 40px;
  }

  .weather-icon img {
    width: 60px;
    height: 60px;
  }
}
</style>