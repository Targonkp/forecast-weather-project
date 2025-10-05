<template>
  <current-time/>
  <search-bar/>
  <city-show/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// @ is an alias to /src
import CityShow from "@/components/Features/CityShow.vue";
import CurrentTime from "@/components/Features/CurrentTime.vue";
import SearchBar from "@/components/Features/SearchBar.vue";

export default defineComponent ({
  name: 'HomeView',
      components: {SearchBar, CurrentTime, CityShow},
})
</script>

<style lang="scss" scoped>

</style>
