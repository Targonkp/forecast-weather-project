<template>
  <Header />
  <Main>
    <router-view v-slot="{ Component }">
      <keep-alive include="Map">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </Main>
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useDestinationStore } from "@/store/DestinationStore";
import Header from "@/components/Common/Header.vue";
import Main from "@/components/Common/Main.vue";
import Footer from "@/components/Common/Footer.vue";
export default defineComponent({
  name: "App",
  components: { Footer, Main, Header },
  async mounted() {
    const store = useDestinationStore();
    try {
      await store.fetchGeoData();
      await store.fetchWeatherForecast();
    } catch (error: unknown) {
      console.error("Ошибка загрузки данных", error);
    }

    // Автоматически обновлять каждые 30 минут
    setInterval(
      () => {
        store.fetchGeoData();
        store.fetchWeatherForecast();
        console.log("Прогноз обновлен");
      },
      30 * 60 * 1000,
    );
  },
});
</script>

<style lang="scss">
#app {
  text-align: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
