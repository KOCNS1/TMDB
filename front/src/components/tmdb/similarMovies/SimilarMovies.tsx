import { Link } from "react-router-dom";
import { RadialProgress } from "react-daisyui";
import { SimilarMovies } from "../../../types/api-interfaces";

type Props = {
  content: SimilarMovies[];
  type: "movie" | "tv";
};

const getColor = (value: number) => {
  if (value >= 7 && value <= 10) return " text-success";
  else if (value >= 4 && value <= 7) return " text-warning";
  else if (value >= 0 && value <= 4) return " text-error";
};

const SimilarMoviesComponent = ({ content, type }: Props) => {
  return (
    <div className="flex flex-col gap-6 mt-6">
      <p className="text-white text-2xl font-bold">Similar {type}: </p>
      <div className="carousel carousel-center w-full space-x-4 rounded-box text-white">
        {content.map((item) => (
          <div className="carousel-item w-52" key={item.id}>
            <div>
              <Link to={`/tmdb/details/${type}/${item.id}`}>
                <img
                  src={`https://www.themoviedb.org/t/p/w440_and_h660_face/${item.poster_path}`}
                  width={440}
                  height={660}
                  className="rounded-box shadow-lg shadow-black"
                />
              </Link>

              <div className="relative">
                <p className="font-bold pt-5">
                  {item.title ? item.title : item.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarMoviesComponent;
