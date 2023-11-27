import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { User } from './user.entity';

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

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: Partial<User>) {
    const result = await this.userService.update(id, updateUserDto);
    return result;
  }
}
