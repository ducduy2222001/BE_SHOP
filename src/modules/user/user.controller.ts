import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';

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
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Post(':id')
  delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
