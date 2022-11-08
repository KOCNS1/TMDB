import axios from "axios";
import { ILoginResponse, IUser } from "./types";

const BASE_URL = "http://localhost:3333/api/";

export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const refreshAccessTokenFn = async () => {
  const response = await authApi.get<ILoginResponse>("auth/refresh");
  return response.data;
};

authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const errMessage = error.response.data.message as string;
    if (errMessage.includes("Unauthorized") && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshAccessTokenFn();
      return authApi(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const signUpUserFn = async (user: {
  email: string;
  password: string;
}) => {
  const response = await authApi.post<ILoginResponse>("auth/register", user);
  return response.data;
};

export const loginUserFn = async (user: {
  email: string;
  password: string;
}) => {
  const response = await authApi.post<ILoginResponse>("auth/login", user);
  return response.data;
};

export const getMeFn = async () => {
  const response = await authApi.get<IUser>("user/me");
  return response.data;
};

authApi.defaults.headers.common["Content-Type"] = "application/json";
