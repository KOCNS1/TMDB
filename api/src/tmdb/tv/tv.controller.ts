import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppendToResponseTv } from 'src/types/api-interfaces';
import { TvService } from './tv.service';

@Controller('tv')
export class TvController {
  constructor(private readonly tvService: TvService) {}

  @Get('popular')
  async getPopular() {
    return this.tvService.getPopular();
  }

  @Post('detail/:id')
  async getDetails(
    @Param('id') id: number,
    @Body('appendToResponse') appendToResponse?: AppendToResponseTv[],
  ) {
    return this.tvService.getDetails(id, appendToResponse);
  }

  @Get(':id/similar')
  async getSimilar(@Param('id') id: number) {
    return this.tvService.getSimilar(id);
  }
}
