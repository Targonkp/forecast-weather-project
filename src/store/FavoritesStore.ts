import { defineStore } from "pinia";
import { FavoritesState } from "@/interfaces/favorites";

export const useFavoritesStore = defineStore("FavoritesStore", {
  state: (): FavoritesState => ({
    //получаю данные из localstorage, если они есть
    favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
  }),

  actions: {
    addNewFavorites(id: number, city: string, country: string) {
      if (!this.favorites.some((fav) => fav.id === id)) {
        this.favorites.push({ id, city, country });
        this.saveToLocalStorage();
      }
    },
    removeFavorites(id: number) {
      this.favorites = this.favorites.filter((fav) => fav.id !== id);
      this.saveToLocalStorage();
    },
    //функция для добавления в localstorage
    saveToLocalStorage() {
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },
  },

  getters: {
    favoritesCount(): number {
      return this.favorites.length;
    },
  },
});

export type FavoritesStoreType = ReturnType<typeof useFavoritesStore>;
