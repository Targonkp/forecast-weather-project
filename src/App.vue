<template>
  <Header/>
  <Main>
  <router-view/>
  </Main>
  <Footer/>
</template>

<script >
import { useDestinationStore } from '@/store/DestinationStore';
import Header from "@/components/Common/Header.vue";
import Main from "@/components/Common/Main.vue";
import Footer from "@/components/Common/Footer.vue";
export default {
  name: "App",
  components: {Footer, Main, Header},
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