import { createSlice } from "@reduxjs/toolkit";
const loadFavorites = () => {
  const savedFavorites = localStorage.getItem("favoriteMovies");
  return savedFavorites ? JSON.parse(savedFavorites) : [];
};
const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favoriteMovies: loadFavorites(),
  },
  reducers: {
    addFavorite: (state, action) => {
      state.favoriteMovies.push(action.payload);
      localStorage.setItem("favoriteMovies", JSON.stringify(state.favoriteMovies)); 
    },
    removeFavorite: (state, action) => {
      state.favoriteMovies = state.favoriteMovies.filter(
        (movie) => movie.imdbID !== action.payload
      );
      localStorage.setItem("favoriteMovies", JSON.stringify(state.favoriteMovies)); 
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
