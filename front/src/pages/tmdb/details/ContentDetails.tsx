import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getDetails, getSimilar } from "../../../api/tmdb.api";
import { Movie, Result, TVDetails } from "../../../types/api-interfaces";
import FullScreenLoader from "../../../components/ui/FullScreenLoader/FullScreenLoader";
import CastSlider from "../../../components/tmdb/cast/Cast";
import SimilarMoviesComponent from "../../../components/tmdb/similarMovies/SimilarMovies";
import RadialProgressBar from "../../../components/ui/RadialProgressBar/RadialProgressBar";
import { getColor } from "../../../utils/getColor";
import TraillerModal from "./ui/TraillerModal";
import { useState } from "react";
import {
  BookmarkIcon,
  HeartIcon,
  ListBulletIcon,
  PlayIcon,
  StarIcon,
} from "@heroicons/react/24/solid";

type Props = { type: "movie" | "tv"; id: string };

const isMovie = (content: Movie | TVDetails): content is Movie => {
  return (content as Movie).title !== undefined;
};

const getYear = (date: Date | undefined) => {
  return new Date(date as Date).getFullYear();
};

const ContentDetails = () => {
  const [open, setOpen] = useState(false);

  const { type, id } = useParams<Props>();

  if (!type || !id) return <div>Not found</div>;

  const { data, isLoading } = useQuery([`tmdb.${type}.getDetails`, id], () =>
    getDetails(type, +id)
  );

  const similarMovies = useQuery([`tmdb.${type}.getSimilarMovies`, id], () =>
    getSimilar(type, +id)
  );

  if (!data || isLoading || similarMovies.isLoading)
    return <FullScreenLoader />;

  return (
    <div className="mt-4">
      <div className="lg:flex-row flex-col flex gap-6 rounded-lg w-full items-center">
        <div
          className={`flex items-center justify-start w-screen lg:w-auto lg:bg-none lg:shadow-none`}
          style={{
            backgroundImage: `linear-gradient(
              rgba(0, 0, 0, 0.2), 
              rgba(0, 0, 0, 0.2)
            ),url(https://www.themoviedb.org/t/p/w1000_and_h450_multi_faces/${data.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "left",
            boxShadow: "inset 0 0 3rem black",
          }}
        >
          <div className="lg:min-w-max w-2/5 py-5 ml-5">
            <img
              src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${data.poster_path}`}
              className="rounded-lg shadow-xl shadow-black"
              alt={isMovie(data) ? data.title : data.original_name}
            />
          </div>
        </div>
        <div className="flex flex-col gap-8 text-white justify-center w-auto mx-auto items-center lg:items-start">
          <div>
            <p className="text-3xl font-bold">
              {isMovie(data) ? data.title : data.original_name}{" "}
              <span className="text-neutral-content">
                (
                {isMovie(data)
                  ? getYear(data.release_date)
                  : getYear(data.first_air_date)}
                )
              </span>
            </p>
            <div className="flex justify-start gap-2 mt-1 font-light">
              {data.genres.map((genre: any, i: number) => (
                <p key={genre.id}>
                  {genre.name}
                  {data.genres.length - 1 !== i ? "," : ""}
                </p>
              ))}
            </div>
          </div>

          <div className="flex-wrap flex items-center lg:justify-start gap-9 w-full justify-around">
            <div className="flex items-center lg:justify-center gap-3">
              <RadialProgressBar
                percentage={data.vote_average * 10}
                sqSize={50}
                strokeWidth={5}
                color={getColor(data.vote_average)}
              />
              <p className="text-white font-light min-w-fit">
                {data.vote_count} votes
              </p>
            </div>
            <div className="border-l border-white h-8 hidden xsm:block lg:hidden"></div>
            <div className="flex lg:static lg:bg-transparent lg:w-auto lg:justify-start gap-5 lg:ml-2 fixed bottom-0 z-10 bg-gray-800 rounded w-screen justify-around pb-3 pt-2 lg:mx-0">
              <button className="lg:border-blue-500 lg:border lg:p-3 hover:border-blue-600 rounded-full p-2">
                <ListBulletIcon className="h-5 w-5 stroke-white" />
              </button>

              <button className="lg:border-blue-500 lg:border lg:p-3 hover:border-blue-600 rounded-full p-2">
                <HeartIcon className="h-5 w-5 stroke-white" />
              </button>
              <button className="lg:border-blue-500 lg:border lg:p-3 hover:border-blue-600 rounded-full p-2">
                <BookmarkIcon className="h-5 w-5 stroke-white" />
              </button>
              <button className="lg:border-blue-500 lg:border lg:p-3 hover:border-blue-600 rounded-full p-2">
                <StarIcon className="h-5 w-5 stroke-white" />
              </button>
            </div>
            <div className=" lg:flex-grow">
              <button
                type="button"
                className="flex justify-center items-center rounded-md border border-blue-500 px-6 py-3 font-medium shadow-sm hover:bg-gray-500 text-white w-full"
                onClick={() => setOpen(true)}
              >
                <PlayIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                <p className="min-w-max">Bande-annonce</p>
              </button>
              {data.videos.results.length > 0 && (
                <TraillerModal
                  open={open}
                  setOpen={setOpen}
                  video={data.videos.results.slice(-1).pop() as Result}
                />
              )}
            </div>
          </div>

          <div className="mt-3">
            <p className="font-extralight italic pb-2">{data.tagline}</p>

            <h4 className="text-xl mt-3">Synopsis</h4>
            <p className="text-white text-sm font-light mt-5 w-fit">
              {data.overview}
            </p>
            {/* <h4 className="text-xl mt-3">{ data.created_by[0].name }</h4> */}
            <p className="text-white text-sm font-light">
              Créatrice / Créateur
            </p>
          </div>
        </div>
      </div>
      {data.casts && <CastSlider content={data.casts.cast.slice(0, 10)} />}

      {similarMovies.data && (
        <SimilarMoviesComponent
          content={similarMovies.data.results}
          type={type}
        />
      )}
    </div>
  );
};

export default ContentDetails;
