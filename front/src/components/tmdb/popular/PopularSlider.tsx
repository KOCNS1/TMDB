import { Link } from "react-router-dom";
import { RadialProgress } from "react-daisyui";
import { Movie, TVDetails } from "../../../types/api-interfaces";
import RadialProgressBar from "../../ui/RadialProgressBar/RadialProgressBar";
import { getColor } from "../../../utils/getColor";

export const isMovie = (content: Movie | TVDetails): content is Movie => {
  return (content as Movie).title !== undefined;
};

type Props = {
  content: Movie[] | TVDetails[];
};

const PopularSlider = ({ content }: Props) => {
  return (
    <div
      className="carousel carousel-center w-full space-x-4 rounded-box text-white"
      data-cy="slider"
    >
      {content.map((item) => (
        <div
          className="carousel-item w-52"
          key={item.id}
          data-cy={isMovie(item) ? "movie-card" : "tv-card"}
        >
          <div>
            <Link
              to={`/tmdb/details/${isMovie(item) ? "movie" : "tv"}/${item.id}`}
            >
              <img
                src={`https://www.themoviedb.org/t/p/w440_and_h660_face/${item.poster_path}`}
                width={440}
                height={660}
                className="rounded-box shadow-lg shadow-black"
                alt={isMovie(item) ? item.title : item.name}
              />
            </Link>

            <div className="relative">
              <div className="absolute -top-8 left-1">
                <RadialProgressBar
                  percentage={item.vote_average * 10}
                  sqSize={40}
                  strokeWidth={3}
                  textSize={0.7}
                  color={getColor(item.vote_average)}
                />
              </div>
              {/* <RadialProgress
                size="2.5rem"
                value={item.vote_average * 10}
                className={
                  "bg-neutral absolute -top-6 left-1 text-[0.7rem] radial-progress" +
                  getColor(item.vote_average)
                }
              >
                {item.vote_average * 10}%
              </RadialProgress> */}
              <p className="font-bold pt-7">
                {isMovie(item) ? item.title : item.name}
              </p>
              <p className="text-sm text-gray-200">
                {isMovie(item)
                  ? (item.release_date as unknown as string)
                  : (item.first_air_date as unknown as string)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PopularSlider;
