import {
  type QueryClient,
  useQueries,
  useQuery,
  QueryKey,
} from "@tanstack/react-query";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getPopularMovies, getPopularTvShows } from "../../../api/tmdb.api";
import {
  GenericListResult,
  Movie,
  TVDetails,
} from "../../../types/api-interfaces";
import PopularSlider from "./PopularSlider";

export const getPopulaQuery = () => [
  {
    queryKey: ["tmdb.movie.getAll"],
    queryFn: () => getPopularMovies(),
  },
  {
    queryKey: ["tmdb.tv.getAll"],
    queryFn: () => getPopularTvShows(),
  },
];

export const loader = (queryClient: QueryClient) => () => {
  const queries = getPopulaQuery();
  const queriesData = queries.map((query) =>
    queryClient.getQueryData<GenericListResult<Movie | TVDetails>>({
      queryKey: query.queryKey,
    } as unknown as QueryKey)
  );
  return queriesData.length > 0 && !queriesData.includes(undefined)
    ? (queriesData as GenericListResult<Movie | TVDetails>[])
    : Promise.all(
        queries.map((query) =>
          queryClient.fetchQuery<GenericListResult<Movie | TVDetails>>({
            queryKey: query.queryKey as string[],
            queryFn: query.queryFn as any,
            staleTime: 1000 * 2,
          })
        )
      );
};

const Popular = () => {
  const [showFilm, setShowFilm] = useState(true);

  const [initalMovies, initialTvs] = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;

  const movies = useQuery(["tmdb.movie.getAll"], getPopularMovies, {
    staleTime: 1000 * 2,
    initialData: initalMovies,
  });
  const tv = useQuery(["tmdb.tv.getAll"], getPopularTvShows, {
    staleTime: 1000 * 2,
    initialData: initialTvs,
  });

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
