import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppendToResponseTv } from 'src/types/api-interfaces';
import { TvService } from './tv.service';

@Controller('tv')
export class TvController {
  constructor(private readonly tvService: TvService) {}

  @Get('popular')
  async getPopular() {
    return this.tvService.getPopular();
  }

  @Get('details/:id')
  async getDetails(@Param('id') id: number, @Query('append') append: string) {
    const appendToResponse = append?.split(',') as AppendToResponseTv[];
    return this.tvService.getDetails(id, appendToResponse);
  }
}
