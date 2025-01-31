const APIKEY = import.meta.env.VITE_OMDB_API_KEY;
console.log(import.meta.env.VITE_OMDB_API_KEY);



async function fetchMovies(searchTerm) {
  const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${APIKEY}`);
  const data = await response.json();
  return await data.Search; // Returns an array of movies
}
export async function fetchMoviesDetails(id) {
  const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${APIKEY}`);
  const data = await response.json();
  return await data; // Returns an array of movies
}
export default fetchMovies