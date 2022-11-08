export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface IRefreshTokenResponse {
  accessToken: string;
}

export interface IUser {
  id: number;
  email: string;
  name: string;
  password: string;
}
