import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { ThreeDots } from 'react-loader-spinner'
import { useParams } from 'react-router-dom'
import { FaHeart } from "react-icons/fa6";
import { fetchMoviesDetails } from '../utils/api'
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/favoritesSlice";



const MoviesDetails = () => {
  const [isLoading,setIsLoading] = useState(true)
  const [movieDetails,setMovieDetails] = useState({})
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
      <div className='w-full  h-full  flex justify-center items-center'>
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
          <button className='hover:bg-gray-800  border-1 flex items-center p-3 gap-3 mt-4' onClick={toggleFavorite}>
            <FaHeart size={20}  style={{
              color : isFavorite ? 'red' : 'white'
            }} />
            {isFavorite ? 'Added to favorite' : 'Add to favorite' }
            
          </button>
        </div>
      </div>
      </>
    )
  }
  return (
    <>
      <Header />
      <div className=' bg-cover min-h-[92vh] flex items-center justify-center'
      style={{
         backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), black), url(${Poster})`
      }}>
        <div className=' border-amber-100 w-[90%] h-[80%] '>
          {isLoading ? loader() : showMovieDetails()}
        </div>
      </div>
    </>
  )
}

export default MoviesDetails
