<template>
  <current-time />
  <search-bar />
  <city-show />
  <favorites-list />
</template>

<script lang="ts">
import { defineComponent } from "vue";
// @ is an alias to /src
import CityShow from "@/components/Features/CityShow.vue";
import CurrentTime from "@/components/Features/CurrentTime.vue";
import SearchBar from "@/components/Features/SearchBar.vue";
import FavoritesList from "@/components/Features/Favorites/FavoritesList.vue";

export default defineComponent({
  name: "HomeView",
  components: { FavoritesList, SearchBar, CurrentTime, CityShow },
  data() {
    return {
      cityListVisible: false,
    };
  },
});
</script>

<style lang="scss" scoped></style>
