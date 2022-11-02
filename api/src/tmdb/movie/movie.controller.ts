import { Body, Controller, Get, Param } from '@nestjs/common';
import { AppendToResponseTv } from 'src/types/api-interfaces';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get('popular')
  async getPopular() {
    return this.movieService.getPopular();
  }

  @Get('detail/:id')
  async getDetails(
    @Param('id') id: number,
    @Body('appendToResponse') appendToResponse?: AppendToResponseTv[],
  ) {
    return this.movieService.getDetails(id, appendToResponse);
  }
}
