import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getPopularMovies, getPopularTvShows } from "../../api/tmdb.api";
import { Movie, Tv, TVDetails } from "../../types/api-interfaces";
import PopularSlider from "./PopularSlider";

const Popular = () => {
  const [showFilm, setShowFilm] = useState(true);
  const movies = useQuery(["tmdb.movie.getAll"], getPopularMovies);
  const tv = useQuery(["tmdb.tv.getAll"], getPopularTvShows);

  if (movies.isLoading || tv.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-xl text-white font-bold my-6">Popular</h2>
      <div className="flex gap-5 mb-6">
        <button
          className="rounded-md border border-transparent bg-blue-500 py-2 px-6 text-base font-medium text-white shadow-md hover:bg-blue-600 shadow-black"
          onClick={() => setShowFilm((showFilm) => !showFilm)}
        >
          {showFilm ? "Show Tv" : "Show Film"}
        </button>
      </div>
      {showFilm ? (
        <PopularSlider content={movies.data.results as Movie[]} />
      ) : (
        <PopularSlider content={tv.data.results as TVDetails[]} />
      )}
    </div>
  );
};

export default Popular;
