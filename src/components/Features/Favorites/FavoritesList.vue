<template>
  <div class="favorites-list-wrap">
    <div class="favorites-list-container">
      <span class="heading">Избранное ({{ favoritesListLength }})</span>
      <favorites-list-item
        v-for="favoritesItem of favoritesList"
        :key="favoritesItem.id"
        :favoritesItem="favoritesItem"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { type FavoritesStoreType, useFavoritesStore } from "@/store/FavoritesStore";
import { FavoriteLocation } from "@/interfaces/favorites";
import FavoritesListItem from "@/components/Features/Favorites/FavoritesListItem.vue";

export default defineComponent({
  name: "FavoritesList",
  components: { FavoritesListItem },
  computed: {
    favoritesStore(): FavoritesStoreType {
      return useFavoritesStore();
    },
    favoritesList(): FavoriteLocation[] {
      return this.favoritesStore.favorites;
    },
    favoritesListLength(): number {
      return this.favoritesStore.favoritesCount;
    },
  },
});
</script>

<style scoped lang="scss">
.favorites-list-wrap {
  position: fixed;
  top: 5%;
  left: 2%;
  height: 90vh;
  height: 90dvh;
  overflow: hidden;
  width: clamp(70px, 7%, 140px);
  background-color: rgba(110, 107, 105, 0.65);
  padding: 12px 0;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @include small {
    width: 100%;
    height: 15vh;
    max-height: 132px;
    bottom: 0;
    left: 0;
    top: auto;
  }
}

.favorites-list-container {
  padding: 0 7px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: 100%;
  overflow-y: auto;

  @include small {
    flex-direction: row;
  }

  /* Стили для браузеров на движке WebKit (Chrome, Safari, Edge) */
  &::-webkit-scrollbar {
    /* Ширина всей полосы прокрутки */
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    /* Фон полосы прокрутки. */
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    /* Ползунок прокрутки. */
    background: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
  }
  /* Стили для Firefox */
  & {
    /* делает скроллбар тоньше */
    scrollbar-width: thin;
    /* цвета: сначала цвет ползунка, потом цвет трека */
    scrollbar-color: rgba(255, 255, 255, 0.5) rgba(255, 255, 255, 0.2);
  }
}

.heading {
  padding: 4px 8px;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: $light_color;
  color: $gray_color;

  @include small {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
