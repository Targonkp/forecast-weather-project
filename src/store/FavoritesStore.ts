import { defineStore } from "pinia";

import { FavoritesState, FavoriteLocation } from "@/interfaces/favorites";

export const useFavoritesStore = defineStore("FavoritesStore", {
  state: (): FavoritesState => ({
    favorites: [],
  }),

  actions: {
    addNewFavorites(id: number, city: string, country: string) {
      if (!this.favorites.some((fav) => fav.id === id)) {
        this.favorites.push({ id, city, country });
      }
    },
    removeFavorites(id: number) {
      this.favorites = this.favorites.filter((fav) => fav.id !== id);
    },
  },

  getters: {
    favoritesCount(): number {
      return this.favorites.length;
    },
  },
});

export type FavoritesStoreType = ReturnType<typeof useFavoritesStore>;
