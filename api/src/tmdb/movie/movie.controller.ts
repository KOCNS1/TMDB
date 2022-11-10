import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppendToResponseTv } from 'src/types/api-interfaces';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get('popular')
  async getPopular() {
    return this.movieService.getPopular();
  }

  @Post('detail/:id')
  async getDetails(
    @Param('id') id: number,
    @Body('appendToResponse') appendToResponse?: AppendToResponseTv[],
  ) {
    console.log(appendToResponse);
    return this.movieService.getDetails(id, appendToResponse);
  }

  @Get(':id/similar')
  async getSimilar(@Param('id') id: number) {
    return this.movieService.getSimilar(id);
  }
}
