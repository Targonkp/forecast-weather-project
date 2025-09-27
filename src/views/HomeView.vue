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
}
</script>

<style lang="scss" scoped>

</style>