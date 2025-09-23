<template>
  <Header/>
  <Main>
    <current-time/>
    <search-bar/>
    <city-show/>
  </Main>
  <Footer/>
</template>

<script>
// @ is an alias to /src
import {useDestinationStore} from '@/store/DestinationStore.js'
import Main from "@/components/Common/Main.vue";
import Header from "@/components/Common/Header.vue";
import Footer from "@/components/Common/Footer.vue";
import CityShow from "@/components/Layout/CityShow.vue";
import CurrentTime from "@/components/Layout/CurrentTime.vue";
import SearchBar from "@/components/Layout/SearchBar.vue";

export default {
  name: 'HomeView',
  components: {SearchBar, CurrentTime, CityShow, Footer, Header, Main},
  methods: {
    //Почасовой прогноз на 5 дня (с шагом 3 часа)
    // fetchGeoDataTest(){
    //   fetch('https://api.openweathermap.org/data/2.5/forecast?q=Kazan&appid=36b59a428ae07106b683317f19604659&lang=ru&units=metric')
    //       .then(response => response.json())
    //       .then(data =>
    //       console.log(data)
    //       )
    // }
  },
}
</script>


<style lang="scss" scoped>

</style>