import axios from "axios";
import { ILoginResponse, IUser } from "./types";

const BASE_URL = "http://localhost:3333/api/";

export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

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
    if (error.response.data.message.includes("not refresh")) {
      document.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const refreshAccessTokenFn = async () => {
  const response = await authApi.post<ILoginResponse>("auth/refresh");
  return response.data;
};

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

export const logoutUserFn = async () => {
  const response = await authApi.delete("auth/logout");
  return response.data;
};

authApi.defaults.headers.common["Content-Type"] = "application/json";
