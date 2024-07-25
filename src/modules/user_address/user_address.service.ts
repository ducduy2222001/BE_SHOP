import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserAddress } from './user_address.entity';
import { User } from '../user/user.entity';

@Injectable()
export class UserAddressService {
  constructor(
    @InjectRepository(UserAddress)
    private userAddressRepository: Repository<UserAddress>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createAddress(userId: number, address: any): Promise<UserAddress> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }
    address.user = user.id;
    if (address.is_default === 'true') address.is_default = true;
    address.is_default = false;
    return this.userAddressRepository.save(address);
  }

  async findAll(): Promise<UserAddress[]> {
    return this.userAddressRepository.find();
  }

  async findOne(id: number): Promise<any> {
    const address = await this.userAddressRepository.findOne({
      where: { id },
    });

    const user = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.first_name', 'user.email'])
      .getOne();

    if (!address || !user) {
      throw new Error('Address or User not found');
    }

    return { address, user };
  }
}
