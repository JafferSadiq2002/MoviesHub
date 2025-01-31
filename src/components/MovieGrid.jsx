import React from 'react'
import MovieCard from './MovieCard'

const MovieGrid = (props) => {
    const {movies} = props
  return (
    <>
      <ul className='list-none w-[95%] h-[350px] mt-5 flex items-center overflow-auto gap-5 scrollbar-hide '>
        {
            movies.map((eachMovie) => <MovieCard movie = {eachMovie} /> )
        }
      </ul>
    </>
  )
}

export default MovieGrid
