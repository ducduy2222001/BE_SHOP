import { Controller, Param, Post, Body, Get } from '@nestjs/common';

import { UserAddressService } from './user_address.service';
import { CreateUserAddressDto } from './dto/user_address.dto';
import { User } from '../user/user.entity';

@Controller('user-address')
export class UserAddressController {
  constructor(private userAddressService: UserAddressService) {}

  @Post('createAddress/:userId')
  createAddresses(
    @Param('userId') userId: number,
    @Body() addresses: CreateUserAddressDto,
  ) {
    return this.userAddressService.createAddress(userId, addresses);
  }

  @Get()
  getAllAddressOfUser() {
    return this.userAddressService.findAll();
  }

  @Get(':userId')
  getByIdAddressOfUser(@Param('userId') user: User) {
    return this.userAddressService.findOne(user.id);
  }
}
