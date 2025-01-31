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
    <Link to={`/movie/${imdbID}`}>
      <li className='bg-black p-0 hover:h-[330px] hover:w-[190px] hover:duration-250   text-white w-[180px] h-[320px] shrink-0 rounded-b-[5px]'>
        <img src={Poster} className='h-[220px] w-full' />
        <div className='flex justify-between p-2'>
          <p className='font-semibold text-sm '>{Title}</p>
          <button className=' p-0 self-start' onClick={toggleFavorite}>
            {favoriteIcon}
          </button>
          
        </div>
        
        
      </li>
    </Link>
    
  )
}

export default MovieCard
