import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserOwnerGuard } from './guards/user-owner.guard';
import { Prisma } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return await this.userService.users({});
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req) {
    const userId = id === 'me' ? req.user.userId : +id;
    const user = await this.userService.user({ id: userId });
    id !== 'me' && delete user.password;
    return user;
  }

  @UseGuards(JwtAuthGuard, UserOwnerGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: Prisma.UserUpdateManyMutationInput,
  ) {
    return await this.userService.updateUser({
      where: { id: +id },
      data: updateUserDto,
    });
  }

  @UseGuards(JwtAuthGuard, UserOwnerGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.deleteUser({ id: +id });
  }
}
