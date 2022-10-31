import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Auth, google } from 'googleapis';
import { UserService } from 'src/user/user.service';
import { TokenService } from '../token/token.service';

@Injectable()
export class GoogleAuthService {
  oauth2Client: Auth.OAuth2Client;

  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    this.oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
  }

  async loginGoogleUser(token: string) {
    const ticket = await this.oauth2Client
      .verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      })
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.NOT_ACCEPTABLE);
      });
    const payload = ticket.getPayload();
    const email = payload.email;
    const user = await this.userService.user({ email });
    if (!user) {
      throw new HttpException(
        'Warning: No user found, please register first',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.tokenService.newRefreshAndAccessToken(user);
  }

  async registerGoogleUser(token: string) {
    const ticket = await this.oauth2Client
      .verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      })
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.NOT_ACCEPTABLE);
      });
    const payload = ticket.getPayload();
    const email = payload.email;
    const user = await this.userService.user({ email });
    if (user) {
      throw new HttpException(
        'User already exists, login instead',
        HttpStatus.CONFLICT,
      );
    }
    const newUser = await this.userService.createUser({
      email,
      name: payload.name,
    });
    return this.tokenService.newRefreshAndAccessToken(newUser);
  }
}
