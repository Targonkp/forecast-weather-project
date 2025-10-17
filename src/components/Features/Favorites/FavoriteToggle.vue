<template>
  <div class="wrap">
    <button
      class="favorite-btn"
      @click="toggleFavorite"
      :title="isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'"
    >
      <svg
        class="heart-icon"
        :class="{ active: isFavorite }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="28"
        height="28"
      >
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
           2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
           C13.09 3.81 14.76 3 16.5 3
           19.58 3 22 5.42 22 8.5
           c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  type FavoritesStoreType,
  useFavoritesStore,
} from "@/store/FavoritesStore";
import { FavoriteLocation } from "@/interfaces/favorites";

export default defineComponent({
  name: "FavoriteToggle",
  props: {
    id: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
      default: null,
    },
  },
  methods: {
    toggleFavorite() {
      if (this.isFavorite) {
        this.favoritesStore.removeFavorites(this.id);
      } else {
        this.favoritesStore.addNewFavorites(this.id, this.city, this.country);
      }
    },
  },
  computed: {
    favoritesStore(): FavoritesStoreType {
      return useFavoritesStore();
    },
    //возвращает true или false в зависимости от того, находится ли текущий элемент в списке избранного.
    isFavorite(): boolean {
      return this.favoritesStore.favorites.some(
        (location: FavoriteLocation) => location.id === this.id,
      );
    },
  },
});
</script>

<style scoped lang="scss">
.favorite-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  transition: transform 0.15s ease;
}

.favorite-btn:hover {
  transform: scale(1.1);
}

.heart-icon {
  fill: #bbb;
  transition: fill 0.2s ease;
  display: block;
}

.heart-icon.active {
  fill: red;
}
</style>
