import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../user/user.entity';
import { Role } from '../role/role.entity';
import { UserAddress } from './user_address.entity';

import { UserAddressService } from './user_address.service';

import { UserAddressController } from './user_address.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserAddress, User, Role])],
  providers: [UserAddressService],
  exports: [UserAddressService],
  controllers: [UserAddressController],
})
export class UserAddressModule {}
