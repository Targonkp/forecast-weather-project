export interface FavoriteLocation {
  id: number;
  city: string;
  country: string | null;
}

export interface FavoritesState {
  favorites: FavoriteLocation[];
}
