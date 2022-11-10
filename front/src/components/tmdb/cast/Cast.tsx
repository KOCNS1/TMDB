import { Link } from "react-router-dom";
import { Cast } from "../../../types/api-interfaces";

type Props = {
  content: Cast[];
};

const CastSlider = ({ content }: Props) => {
  return (
    <div className="flex flex-col gap-6 mt-6">
      <p className="text-white text-2xl font-bold">Main Casts: </p>
      <div className="carousel carousel-center w-full space-x-4 rounded-box text-white">
        {content.map((item) => (
          <div className="carousel-item w-52" key={item.id}>
            <div>
              <Link to={""}>
                <img
                  src={
                    item.profile_path
                      ? `https://www.themoviedb.org/t/p/w138_and_h175_face/${item.profile_path}`
                      : "https://via.placeholder.com/138x175"
                  }
                  width={440}
                  height={660}
                  className="rounded-box shadow-lg shadow-black"
                />
              </Link>

              <div className="">
                <p className="font-bold pt-5">{item.name}</p>
                <p className="text-sm text-gray-200">{item.character}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastSlider;
