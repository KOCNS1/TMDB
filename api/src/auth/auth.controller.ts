import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RefreshTokenDto } from '../refresh-token/dto/refresh-token.dto';
import { AuthService } from './auth.service';
import GoogleTokenDto from './dto/google-token.dto';
import { BasicAuthDto } from './dto/basic-auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: BasicAuthDto) {
    return this.authService.basicAuthService.login(body.email, body.password);
  }

  @Post('register')
  async register(@Body() body: BasicAuthDto) {
    return this.authService.basicAuthService.register(
      body.email,
      body.password,
    );
  }

  @Post('refresh')
  async refresh(@Headers('x-refresh') refreshToken: string) {
    if (!refreshToken)
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    return await this.authService.basicAuthService.refresh(refreshToken);
  }

  @Delete('logout')
  async logout(@Body() body: RefreshTokenDto) {
    return this.authService.basicAuthService.logout(body.refreshToken);
  }

  @Post('/verify')
  async verify(
    @Headers('authorization') token: string,
    @Headers('x-refresh') refreshToken: string,
  ) {
    if (!refreshToken)
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    const access_token = token.split(' ')[1];
    return this.authService.basicAuthService.verifyToken(
      access_token,
      refreshToken,
    );
  }

  /**
   * Google OAuth2
   */

  @Post('/google/login')
  async loginGoogleUser(@Body() body: GoogleTokenDto) {
    const result = await this.authService.googleAuthService.loginGoogleUser(
      body.token,
    );
    if (result) {
      return result;
    } else {
      throw new HttpException(
        'Error while loggin in with google',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Post('/google/register')
  async registerGoogleUser(@Body() body: GoogleTokenDto) {
    const result = await this.authService.googleAuthService.registerGoogleUser(
      body.token,
    );
    if (result) {
      return result;
    } else {
      throw new HttpException(
        'Error while registering with google',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  /**
   * TMBD OAuth2 link
   */

  // Gives the user the request token to validate
  @Post('/tmdb/request-token')
  async linkTmdbUser(@Query('redirect_to') redirectUrl?: string) {
    console.log('redirectUrl', redirectUrl);
    return await this.authService.tmdbAuthService.connectTmdb(redirectUrl);
  }

  // takes the validated request token and asign to the user an TMDB access token
  @UseGuards(JwtAuthGuard)
  @Post('/tmdb/link')
  async callbackTmdbUser(@Body() body: { request_token: string }, @Req() req) {
    const userId = req.user.userId;
    const result = await this.authService.tmdbAuthService.linkTmdb(
      userId,
      body.request_token,
    );
    return result;
  }

  // Verify if the user has TMBD token
  @UseGuards(JwtAuthGuard)
  @Get('/tmdb/verify')
  async verifyTmdbUser(@Req() req) {
    const userId = req.user.userId;
    const valid = await this.authService.tmdbAuthService.userHasTmdbToken(
      userId,
    );
    return { valid };
  }

  // Delete the TMBD token
  @UseGuards(JwtAuthGuard)
  @Delete('/tmdb/unlink')
  async unlinkTmdbUser(@Req() req) {
    const userId = req.user.userId;
    const result = await this.authService.tmdbAuthService.unlinkTmdb(userId);
    return result;
  }
}
