import { Module } from '@nestjs/common';
import { UserAddressService } from './user_address.service';
import { UserAddressController } from './user_address.controller';

@Module({
  providers: [UserAddressService],
  exports: [UserAddressService],
  controllers: [UserAddressController],
})
export class UserAddressModule {}
