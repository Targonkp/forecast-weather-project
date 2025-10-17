<template>
  <div class="favorites-list-item" @click="getWeather(favoritesItem.city, favoritesItem.country)">
    <div class="city-name">{{ favoritesItem.city }}</div>
    <div class="country-code">{{ favoritesItem.country }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { FavoriteLocation } from "@/interfaces/favorites";
import { type DestinationStoreType, useDestinationStore } from "@/store/DestinationStore";

export default defineComponent({
  name: "FavoritesListItem",
  props: {
    favoritesItem: {
      type: Object as PropType<FavoriteLocation>,
      required: true,
    },
  },
  computed: {
    useDestinationStore(): DestinationStoreType {
      return useDestinationStore();
    },
  },
  methods: {
    getWeather(city: string, country: string) {
      this.useDestinationStore.fetchFindCityWeather(city, country);
    },
  },
});
</script>

<style scoped lang="scss">
.favorites-list-item {
  cursor: pointer;
  width: 100%;
  aspect-ratio: 1.5 / 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(241, 234, 227, 0.7);
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(2px);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  @include small {
    width: 100px;
  }
}
</style>
