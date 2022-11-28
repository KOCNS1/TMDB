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
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import GoogleTokenDto from './dto/google-token.dto';
import { BasicAuthDto } from './dto/basic-auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: BasicAuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const res = await this.authService.basicAuthService.login(
      body.email,
      body.password,
    );
    response.cookie('refreshToken', res.refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: 'none',
      secure: true,
    });

    response.cookie('accessToken', res.accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 900000),
      sameSite: 'none',
      secure: true,
    });
    response.cookie('logged_in', true, {
      httpOnly: false,
      expires: new Date(Date.now() + 900000),
      //sameSite: 'none',
      secure: false,
    });
    return res;
  }

  @Post('register')
  async register(
    @Body() body: BasicAuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const res = await this.authService.basicAuthService.register(
      body.email,
      body.password,
    );
    response.cookie('refreshToken', res.refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: 'none',
      secure: true,
    });

    response.cookie('accessToken', res.accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 900000),
      sameSite: 'none',
      secure: true,
    });
    response.cookie('logged_in', true, {
      httpOnly: false,
      expires: new Date(Date.now() + 900000),
      //sameSite: 'none',
      secure: false,
    });
    return res;
  }

  @Post('refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies.refreshToken;
    if (!refreshToken)
      throw new HttpException('No refresh token', HttpStatus.UNAUTHORIZED);
    const res = await this.authService.basicAuthService.refresh(refreshToken);
    response.cookie('accessToken', res.accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 900000),
      sameSite: 'none',
      secure: true,
    });
    response.cookie('logged_in', true, {
      httpOnly: false,
      expires: new Date(Date.now() + 900000),
      //sameSite: 'none',
      secure: false,
    });
    return res;
  }

  @Delete('logout')
  async logout(@Req() req, @Res() res: Response) {
    const refreshToken = req.cookies.refreshToken;
    res.cookie('accessToken', '', { maxAge: -1 });
    res.cookie('refreshToken', '', { maxAge: -1 });
    res.cookie('logged_in', '', { maxAge: -1 });
    return this.authService.basicAuthService.logout(refreshToken);
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
  async loginGoogleUser(
    @Body() body: GoogleTokenDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.googleAuthService.loginGoogleUser(
      body.token,
    );
    if (result) {
      response.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: 'none',
        secure: true,
      });

      response.cookie('accessToken', result.accessToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 900000),
        sameSite: 'none',
        secure: true,
      });
      response.cookie('logged_in', true, {
        httpOnly: false,
        expires: new Date(Date.now() + 900000),
        //sameSite: 'none',
        secure: false,
      });
      return result;
    } else {
      throw new HttpException(
        'Error while loggin in with google',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Post('/google/register')
  async registerGoogleUser(
    @Body() body: GoogleTokenDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.googleAuthService.registerGoogleUser(
      body.token,
    );
    if (result) {
      response.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: 'none',
        secure: true,
      });

      response.cookie('accessToken', result.accessToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 900000),
        sameSite: 'none',
        secure: true,
      });
      response.cookie('logged_in', true, {
        httpOnly: false,
        expires: new Date(Date.now() + 900000),
        //sameSite: 'none',
        secure: false,
      });
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
