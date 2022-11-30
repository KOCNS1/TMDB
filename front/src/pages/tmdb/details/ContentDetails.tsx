import { useQuery } from "@tanstack/react-query";
import { Button, RadialProgress } from "react-daisyui";
import { useParams } from "react-router-dom";
import { getDetails, getSimilar } from "../../../api/tmdb.api";
import { Movie, Result, TVDetails } from "../../../types/api-interfaces";
import FullScreenLoader from "../../../components/ui/FullScreenLoader/FullScreenLoader";
import CastSlider from "../../../components/tmdb/cast/Cast";
import ReactPlayer from "react-player";
import SimilarMoviesComponent from "../../../components/tmdb/similarMovies/SimilarMovies";
import RadialProgressBar from "../../../components/ui/RadialProgressBar/RadialProgressBar";

type Props = { type: "movie" | "tv"; id: string };

const isMovie = (content: Movie | TVDetails): content is Movie => {
  return (content as Movie).title !== undefined;
};

const getYear = (date: Date | undefined) => {
  return new Date(date as Date).getFullYear();
};

const getColor = (value: number) => {
  if (value >= 7 && value <= 10) return "rgb(22 163 74)";
  else if (value >= 4 && value <= 7) return "rgb(202 138 4)";
  else if (value >= 0 && value <= 4) return "rgb(220 38 38)";
  else return "rgb(22 163 74)";
};

const ContentDetails = () => {
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
      <div className="flex gap-6 rounded-lg p-4">
        <div className="w-1/4">
          <img
            src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${data.poster_path}`}
            width={300}
            height={450}
            className="rounded-lg shadow-lg shadow-black"
            alt={isMovie(data) ? data.title : data.original_name}
          />
        </div>
        <div className="flex flex-col gap-10 text-white w-3/4 justify-center">
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

          <div className="flex items-center justify-start gap-9">
            <div className="flex items-center justify-center gap-3">
              <RadialProgressBar
                percentage={data.vote_average * 10}
                sqSize={50}
                strokeWidth={5}
                color={getColor(data.vote_average)}
              />
              <p className="text-white font-light">{data.vote_count} votes</p>
            </div>
            <div className="flex justify-between gap-5">
              <Button
                className="border-blue-500 hover:border-blue-600 border-2"
                shape="circle"
                variant="outline"
                startIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-6 h-6 stroke-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                }
              ></Button>

              <Button
                className="border-blue-500 hover:border-blue-600 border-2"
                shape="circle"
                variant="outline"
                startIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 stroke-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                }
              ></Button>
              <Button
                className="border-blue-500 hover:border-blue-600 border-2"
                shape="circle"
                variant="outline"
                startIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-6 h-6 stroke-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                    />
                  </svg>
                }
              ></Button>
              <Button
                className="border-blue-500 hover:border-blue-600 border-2"
                shape="circle"
                variant="outline"
                startIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-6 h-6 stroke-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                }
              ></Button>
            </div>
            <div>
              <label
                htmlFor="my-modal-4"
                className="btn modal-button btn-outline border-blue-500 hover:border-blue-600 text-white gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                  />
                </svg>
                Bande-annonce
              </label>

              <input type="checkbox" id="my-modal-4" className="modal-toggle" />
              <label htmlFor="my-modal-4" className="modal cursor-pointer">
                <label
                  className="modal-box relative max-w-full p-0 bg-black"
                  htmlFor=""
                >
                  <label
                    htmlFor="my-modal-4"
                    className="btn btn-sm btn-circle absolute right-2 top-2 bg-transparent text-white"
                  >
                    ✕
                  </label>

                  <h3 className="text-lg font-bold ml-3 py-3">Bande-annonce</h3>
                  {data.videos.results.length > 0 && (
                    <ReactPlayer
                      url={`https://www.youtube.com/watch?v=${
                        (data.videos.results.slice(-1).pop() as Result).key
                      }`}
                      width="100%"
                      controls={true}
                      height="50vh"
                    />
                  )}
                </label>
              </label>
            </div>
          </div>

          <div className="-mt-3">
            <p className="font-extralight italic pb-2">{data.tagline}</p>

            <h4 className="text-xl">Synopsis</h4>
            <p className="text-white text-sm font-light mt-5">
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
