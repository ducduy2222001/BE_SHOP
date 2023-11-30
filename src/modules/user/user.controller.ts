import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { User } from './user.entity';
import { AuthGuard } from '../auth/auth.guard';
import { Role } from '../role/enum/role.enum';
import { Roles } from '../role/constants/role.decorator';
import { RolesGuard } from '../role/roles.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  getAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Post(':id')
  delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: Partial<User>) {
    const result = await this.userService.update(id, updateUserDto);
    return result;
  }
}
