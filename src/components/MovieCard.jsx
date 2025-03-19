import { memo } from "react";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/favoritesSlice";

const MovieCard = memo((props) => {
  const { movie } = props;
  const { Poster, Title, imdbID } = movie;
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favoriteMovies);

  const isFavorite = favorites.some((fav) => fav.imdbID === imdbID);
  const favoriteIcon = isFavorite ? (
    <FaHeart size={25} className="shrink-0 ml-1 text-red-600" />
  ) : (
    <FaRegHeart size={25} className="shrink-0 ml-1" />
  );
  const toggleFavorite = (event) => {
    event.preventDefault();
    if (isFavorite) {
      dispatch(removeFavorite(imdbID));
    } else {
      dispatch(addFavorite({ Title, Poster, imdbID }));
    }
  };

  return (
    <Link
      className="duration-500 transform hover:scale-105"
      to={`/movie/${imdbID}`}
    >
      <li className="flex flex-col text-white w-[200px] h-[300px] shrink-0 rounded-lg overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-gray-500">
        <div className="relative w-full h-72 overflow-hidden rounded-lg">
          <img
            src={Poster}
            className="w-full h-full object-cover transition-transform duration-350 hover:scale-110"
          />
        </div>
        <div className="flex justify-between p-2 mt-3">
          <p className="font-semibold text-[12px] ">{Title}</p>
          <button
            className=" p-0 self-start active:h-9 m-2 "
            onClick={toggleFavorite}
          >
            {favoriteIcon}
          </button>
        </div>
      </li>
    </Link>
  );
});

MovieCard.displayName = "MovieCard";

export default MovieCard;
