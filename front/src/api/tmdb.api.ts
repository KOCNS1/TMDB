import { Movie, TVDetails } from "../types/api-interfaces";
import { Search } from "../types/search";
import { authApi } from "./auth";

export const getPopularMovies = async () => {
  const response = await authApi.get("/movie/popular");
  return response.data;
};

export const getDetails = async (type: string, id: number) => {
  const response = await authApi.post<Movie | TVDetails>(
    `/${type}/detail/${id}`,
    {
      appendToResponse: ["videos", "casts"],
    }
  );
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

export const getRequestTokenFromTmdb = async () => {
  const response = await authApi.post<{ url: string; request_token: string }>(
    "http://localhost:3333/api/auth/tmdb/request-token",
    {},
    {
      params: {
        redirect_to: "http://localhost:5173/validate",
      },
    }
  );
  return response;
};

export const convertRequestTokenToAccessToken = (requestToken: string) => {
  return authApi.post<{ access_token: string }>(
    "http://localhost:3333/api/auth/tmdb/link",
    {
      request_token: requestToken,
    }
  );
};

export const verifyTmdbToken = async () => {
  const response = await authApi.get<{ valid: boolean }>(
    "http://localhost:3333/api/auth/tmdb/verify"
  );
  return response.data;
};

export const unlinkTmdb = async () => {
  const response = await authApi.delete<{ valid: boolean }>(
    "http://localhost:3333/api/auth/tmdb/unlink"
  );
  return response.data;
};
