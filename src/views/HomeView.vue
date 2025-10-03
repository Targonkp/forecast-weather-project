<template>
    <current-time/>
    <search-bar/>
    <city-show/>
</template>

<script>
// @ is an alias to /src
import {useDestinationStore} from '@/store/DestinationStore.js'
import Main from "@/components/Common/Main.vue";
import Header from "@/components/Common/Header.vue";
import Footer from "@/components/Common/Footer.vue";
import CityShow from "@/components/Features/CityShow.vue";
import CurrentTime from "@/components/Features/CurrentTime.vue";
import SearchBar from "@/components/Features/SearchBar.vue";

export default {
  name: 'HomeView',
  components: {SearchBar, CurrentTime, CityShow},
}
</script>

<style lang="scss" scoped>

</style>