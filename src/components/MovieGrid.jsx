import React from "react";
import MovieCard from "./MovieCard";

const MovieGrid = (props) => {
  const { movies } = props;
  return (
    <>
      <ul className="list-none w-[95%] p-5 h-[350px] overflow-y-hidden mt-5 flex items-start overflow-auto gap-5 scrollbar-hide ">
        {movies.map((eachMovie) => (
          <MovieCard movie={eachMovie} key={eachMovie.imdbID} />
        ))}
      </ul>
    </>
  );
};

export default MovieGrid;
