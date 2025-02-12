import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { ThreeDots } from 'react-loader-spinner'
import { useParams } from 'react-router-dom'
import { FaHeart } from "react-icons/fa6";
import { fetchMoviesDetails } from '../utils/api'
import fetchMovies from '../utils/api'
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/favoritesSlice";
import MovieCard from '../components/MovieCard';



const MoviesDetails = () => {
  const [isLoading,setIsLoading] = useState(true)
  const [movieDetails,setMovieDetails] = useState({})
  const [similarMovies,setSimilarMovies] = useState([])
  const {Title,Plot,Poster,Released,Runtime,Genre,Director,Writer,Actors,imdbRating,imdbVotes} = movieDetails
  const {id} = useParams()
  const dispatch = useDispatch()
  const favorites = useSelector((state) => state.favorites.favoriteMovies)
  const isFavorite = favorites.some((fav) => fav.imdbID === id);
  const toggleFavorite = (event) => {
      if (isFavorite) {
          dispatch(removeFavorite(id));
      } else {
          dispatch(addFavorite({Title,Poster,imdbID : id}));
        }
      };
  const loader = () => {
    return(
      <div className=' w-[80vw]  h-[80vh]  flex justify-center items-center'>
         <ThreeDots color='#ffffff' className='w-2' /> 
      </div>
      
    )
  }
  
  useEffect(() => {
     const getMovieDetails = async () => {
         const movieDetailsObject = await fetchMoviesDetails(id)
         setIsLoading(false)
         setMovieDetails(movieDetailsObject)
     }
     getMovieDetails()
  },[])
  useEffect(() => {
    
    const getSimilerMovies = async (similarGenre) => {
      const similarMoviesFromApi = await fetchMovies(similarGenre)
      setSimilarMovies(similarMoviesFromApi)

    }
    if(Genre) {
      const similarGenre = Genre.split(',')[0]
      getSimilerMovies(similarGenre)
    }
    
  },[movieDetails])
  const showMovieDetails = () => {
    return(
      <>
      <div className=' md:flex h-full w-full'>
        <img className='md:self-start w-[200px] h-[300px] md:w-[250px] md:h-[350px] xl:w-[300px] xl:h-[400px]' src={Poster} />
        
        <div className='text-white p-4 pt-9 max-w-[512px] xl:pt-17  xl:pl-7'>
          <h2 className='text-2xl font-semibold xl:text-3xl'>{Title}</h2>
          <p className='text-sm text-gray-300 xl:not-first:text-[16px]'>{Plot}</p>
          <p className='text-md font-semibold mt-3 mb-3 text-gray-300 xl:text-lg'>Status: Released | Date : {Released} | {Runtime} long </p>
          <p className='text-md font-bold mt-3 mb-3 text-gray-300'>Genre : <span className='font-semibold'>{Genre}</span></p>
          <p>Director : {Director}, Writer : {Writer} </p>
          <p className='font-bold'>Actors : <span className='font-semibold'>{Actors}</span></p>
          <p className='font-bold'>Rating : <span className='font-semibold'>{imdbRating} imdb , {imdbVotes} votings</span></p>
          <button className='favorite-button'  onClick={toggleFavorite}>
            <FaHeart size={20}  style={{
              color : isFavorite ? 'red' : 'white'
            }} />
            {isFavorite ? 'Added to Favorites' : 'Add to Favorites' }
            
          </button>
        </div>
      </div>
      </>
    )
  }
  return (
    <div className='max-h-[100vh] flex flex-col'>
    
      <Header />
      <div className='bg-cover min-h-[100vh] p-2 md:p-8   overflow-auto scrollbar-hide'
      style={{
         backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), black), url(${Poster})`
      }}>
        {isLoading ? loader() : (
           <>
            <div className=' border-amber-100 w-[90%] h-[80%] mb-5 mt-5 '>
              {showMovieDetails()}
            </div>
            <div className='mt-12 mb-12'>
               <h2 className='text-white font-bold text-2xl'>Similer Movies</h2>
               <ul className='list-none mt-8 p-0 pt-2 pb-16 flex flex-wrap gap-3 md:gap-7'>
                  {
                    similarMovies ? (
                      similarMovies.map((eachMovie) => <MovieCard movie = {eachMovie} key={eachMovie.imdbID} />)
                    ) : null
                  }
    
               </ul>
            </div>
          </>
        )}

        
      </div>
      
    </div>
  )
}

export default MoviesDetails
