import React from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Explore from './pages/Explore'
import MoviesDetails from './pages/MoviesDetails'
import Favorites from './pages/Favorites'
const App = () => {
  return (

    <BrowserRouter>
      <Routes>
        <Route exact path='/' element = {<Home />} />
        <Route exact path ='/explore' element = {<Explore />} />
        <Route exact path='/movie/:id' element ={<MoviesDetails/>} />
        <Route exact path='/favorites' element ={<Favorites />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
