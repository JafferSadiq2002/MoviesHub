import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import fetchMovies from "../utils/api";
import { ThreeDots } from "react-loader-spinner";

import MovieGrid from "../components/MovieGrid";
const Home = () => {
  const [topRated, setTopRated] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getTopMovies = async () => {
      const topRatedMovies = await fetchMovies("movies");
      const actionMovies = await fetchMovies("action");
      const comedyMovies = await fetchMovies("comedy");
      const tvShows = await fetchMovies("series");

      setTopRated(topRatedMovies);
      setActionMovies(actionMovies);
      setComedyMovies(comedyMovies);
      setTvShows(tvShows);
      setIsLoading(false);
    };
    getTopMovies();
  }, []);
  const loader = () => {
    return (
      <div className="w-[100vw]  h-50  flex justify-center items-center">
        <ThreeDots color="#ffffff" height={40} width={40} className="w-2" />
      </div>
    );
  };

  return (
    <div className="max-h-[100vh] flex flex-col">
      <Header />
      <div className="bg-gradient-to-b from-gray-900 to-black   text-white text-xl font-bold min-h-[89vh] max-w-[100vw]  p-[10px] box-border overflow-auto scrollbar-hide">
        <div>
          <h2>Top Rated</h2>
          {isLoading ? loader() : <MovieGrid movies={topRated} />}
        </div>
        <div>
          <h2>Action</h2>
          {isLoading ? loader() : <MovieGrid movies={actionMovies} />}
        </div>
        <div>
          <h2>Comedy</h2>
          {isLoading ? loader() : <MovieGrid movies={comedyMovies} />}
        </div>
        <div>
          <h2>Tv Shows</h2>
          {isLoading ? loader() : <MovieGrid movies={tvShows} />}
        </div>
      </div>
    </div>
  );
};

export default Home;
