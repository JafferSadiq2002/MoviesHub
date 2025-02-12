import React from 'react'
import Header from '../components/Header'
import {  useSelector } from "react-redux";
import MovieCard from '../components/MovieCard';

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.favoriteMovies)
  return (
    <>
      <Header />
      <div className='bg-gradient-to-b from-[#121212] to-[#2a0000] h-[92vh] max-w-[100vw] flex items-center justify-center p-5'>
        <ul className=' list-none md:p-10 h-[95%] w-[100%] gap-3 md:gap-10 flex items-center flex-wrap overflow-auto scrollbar-hide'>
          {
            favorites.map((eachMovie) => (<MovieCard movie={eachMovie} key={eachMovie.imdbID} />))
          }
        </ul>
      </div>
    </>
  )
}

export default Favorites
