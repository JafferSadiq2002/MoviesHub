import React, { useState } from 'react'
import Header from '../components/Header'
import { FaSearch } from "react-icons/fa";
import { IoFilterOutline } from "react-icons/io5";
import { ThreeDots } from 'react-loader-spinner';
import fetchMovies from '../utils/api'
import MovieCard from '../components/MovieCard';
const filterGenresList = [
      {
        text : 'Action',
        id : 'action'
      },
      {
        text : 'Adventure',
        id : 'adventure'
      },
      {
        text : 'Animation',
        id : 'animation'
      },
      {
        text : 'Crime',
        id : 'crime'
      },
      {
        text : 'Fantasy',
        id : 'fantasy'
      },
      {
        text : 'Horror',
        id : 'horror'
      },
      {
        text : 'Sci-Fi',
        id : 'sci-fi'
      },
      {
        text : 'Romance',
        id : 'romance'
      },
      {
        text : 'Thriller',
        id : 'thriller'
      },
      {
        text : 'War',
        id : 'war'
      },
      {
        text : 'Sport',
        id : 'sport'
      },
      {
        text : 'Musical',
        id : 'musical'
      },
    ]
const viewsConstants = {
  sucess : 'SUCSSES',
  loading : 'LOADING',
  initial : 'INITIAL',
  failure : 'FAILURE'
}
const Explore = () => {
    const [showFilters,setShowFilters] = useState(false)
    const [selectedFilter,setSelectedFilter] = useState('')
    const [searchedMovies,setSearchMovies]  = useState([])
    const [viewStatus,setViewStatus] = useState(viewsConstants.initial)
    
    const onSelectFilter = (e) => {
        const selectedGenre = e.target.id
        setSelectedFilter(selectedGenre)
        setShowFilters(false)
    }
    const onClickSearch = () => {
      setViewStatus(viewsConstants.loading)
      const getSearchedMovies = async () => {

        const movies = await fetchMovies(selectedFilter)
        if (movies !== undefined) {
             setSearchMovies (movies)
             setViewStatus(viewsConstants.sucess)
         }else{
          setViewStatus(viewsConstants.failure)
         }
        
      }
      getSearchedMovies()

    }
    const loader = () => {
      return(
        <div className='w-full  h-full  flex justify-center items-center'>
           <ThreeDots color='#ffffff' className='w-2' /> 
        </div>
        
      )
    }
    const showSearchedMovies = () => {
      return(
        <>
          <h2 className='text-center text-gray-400 text-lg mb-3'>Your Search Results</h2>
          <ul className='list-none w-full h-full flex flex-wrap overflow-auto  scrollbar-hide gap-3'>
            {searchedMovies.map((eachMovie) => <MovieCard movie ={eachMovie} key={eachMovie.imdbId}  />)}
          </ul>
        </>
      )
    }
    const initialTime = () => {
      return(
        <h1 className='text-center text-gray-400 text-lg m-6'>Search above for movies or use filters</h1>
      )
    }
    const failureView = () => {
      return(
         <h2 className='text-center text-gray-400 text-lg mb-3'>No movies Found</h2>
      )
    }
    const showView = () => {
      switch (viewStatus) {
        case viewsConstants.initial:
          return initialTime()
        case viewsConstants.sucess:
          return showSearchedMovies()
        case viewsConstants.loading:
          return loader()
        case viewsConstants.failure:
          return failureView()
        default :
          return null
      }
    }
  return (
    <>
      <Header />
      <div className='show-case flex justify-end w-full h-full fixed duration-500' style={{
        visibility : showFilters ? 'visible' : 'hidden',
        opacity  : showFilters ? 1 : 0
      }} onClick={() => {setShowFilters(false)}}>
        <div onClick={(e) => {
            e.stopPropagation()
        }} className='h-full w-[40%] md:w-[20%] bg-white absolute duration-[400ms] p-8' style={{
            right : showFilters ? '0%' : '-100%'
        }}>
          {
            filterGenresList.map((eachGenre) => {
              return (
                <li id={eachGenre.id} className=' cursor-pointer hover:text-blue-700 hover:text-xl mb-4 list-none text-lg font-semibold ' onClick={onSelectFilter}>
                  {eachGenre.text}
                </li>
              )
            })
          }
        </div>
      </div>
      <div className='bg-[#343642] max-w-[100vw] min-h-[92vh] p-5 box-border'>
         <div className='w-[90%] mx-auto flex items-center gap-4'>
           <input type='search' value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)} placeholder='Search Movie, Series etc...' className='border-amber-50 text-amber-100 border-2 h-10 rounded-2xl w-[80%] outline-none p-4 '  />
           <FaSearch  className='text-white text-3xl' onClick={onClickSearch} />
           <IoFilterOutline onClick={() => {setShowFilters(true)}} className='text-white text-3xl cursor-pointer' />
         </div>
         <div className=' border-amber-100 h-[75vh] w-[100%]'>
           {showView()}
         </div>
      </div>
    </>
  )
}

export default Explore
