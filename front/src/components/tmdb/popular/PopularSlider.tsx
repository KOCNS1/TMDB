import { Link } from "react-router-dom";
import { RadialProgress } from "react-daisyui";
import { Movie, TVDetails } from "../../../types/api-interfaces";

export const isMovie = (content: Movie | TVDetails): content is Movie => {
  return (content as Movie).title !== undefined;
};

type Props = {
  content: Movie[] | TVDetails[];
};

const getColor = (value: number) => {
  if (value >= 7 && value <= 10) return " text-success";
  else if (value >= 4 && value <= 7) return " text-warning";
  else if (value >= 0 && value <= 4) return " text-error";
};

const PopularSlider = ({ content }: Props) => {
  return (
    <div className="carousel carousel-center w-full space-x-4 rounded-box text-white">
      {content.map((item) => (
        <div className="carousel-item w-52" key={item.id}>
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
              <RadialProgress
                size="2.5rem"
                value={item.vote_average * 10}
                className={
                  "bg-neutral absolute -top-6 left-1 text-[0.7rem] radial-progress" +
                  getColor(item.vote_average)
                }
              >
                {item.vote_average * 10}%
              </RadialProgress>
              <p className="font-bold pt-5">
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
