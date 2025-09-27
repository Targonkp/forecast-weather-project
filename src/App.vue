<template>
  <router-view/>
</template>

<script >
import { useDestinationStore } from '@/store/DestinationStore';
export default {
  name: "App",
  async mounted() {
    const store = useDestinationStore();
    try{
      await store.fetchGeoData();
      await store.fetchWeatherForecast();
    }
    catch (error) {
      console.error('Ошибка загрузки данных', error);
    }

    // Автоматически обновлять каждые 30 минут
    setInterval(() => {
      store.fetchGeoData();
      store.fetchWeatherForecast();
      console.log('Прогноз обновлен')
    }, 30 * 60 * 1000);
  }
}

</script>

<style lang="scss">
#app {
  text-align: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>