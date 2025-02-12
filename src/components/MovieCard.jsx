import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/favoritesSlice";




const MovieCard = (props) => {
    const {movie} = props
    const {Poster,Title,imdbID} = movie
    const dispatch = useDispatch()
    const favorites = useSelector((state) => state.favorites.favoriteMovies)
    
    const isFavorite = favorites.some((fav) => fav.imdbID === imdbID);
    const favoriteIcon = isFavorite ? <FaHeart size={25} className='shrink-0 ml-1 text-red-600' /> : <FaRegHeart size={25} className='shrink-0 ml-1' />
    const toggleFavorite = (event) => {
      event.preventDefault()
      if (isFavorite) {
        dispatch(removeFavorite(imdbID));
      } else {
        dispatch(addFavorite({Title,Poster,imdbID}));
      }
      };


  return (
    <Link className='duration-500' to={`/movie/${imdbID}`}>
      <li className='bg-black p-0 rounded-2xl shadow-md shadow-amber-300 hover:scale-103 hover:duration-200 hover:shadow-2xl hover:border-2 hover:border-amber-200  text-white w-[180px] h-[350px] shrink-0 '>
        <img src={Poster} className='h-[250px] w-full rounded-2xl' />
        <div className='flex justify-between p-2 mt-3'>
          <p className='font-semibold text-[12px] '>{Title}</p>
          <button className=' p-0 self-start active:h-9 m-2 ' onClick={toggleFavorite}>
            {favoriteIcon}
          </button>
          
        </div>
        
        
      </li>
    </Link>
    
  )
}

export default MovieCard
