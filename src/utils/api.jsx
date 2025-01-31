
const APIKEY = 'd7d2ba32'

async function fetchMovies(searchTerm) {
  const response = await fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=${APIKEY}`);
  const data = await response.json();
  return await data.Search; // Returns an array of movies
}
export async function fetchMoviesDetails(id) {
  const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=${APIKEY}`);
  const data = await response.json();
  return await data; // Returns an array of movies
}
export default fetchMovies