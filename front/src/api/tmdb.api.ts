import { Search } from "../types/search";
import { authApi } from "./auth";

export const getPopularMovies = async () => {
  const response = await authApi.get("/movie/popular");
  return response.data;
};

export const getDetails = async (type: string, id: number) => {
  const response = await authApi.get(`/${type}/detail/${id}`, {
    data: {
      append_to_response: ["videos"],
    },
  });
  return response.data;
};

export const getPopularTvShows = async () => {
  const response = await authApi.get("/tv/popular");
  return response.data;
};

export const getSearchResults = async (query: string) => {
  const response = await authApi.get<Search>("/search", {
    params: {
      query,
    },
  });
  return response.data;
};
