import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  ConflictException,
  Param,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(user: any): Promise<any> {
    user.password = bcrypt.hashSync(user.password, 8);
    try {
      await this.userRepository.save(user);
    } catch (error) {
      throw new ConflictException('No No');
    }
    return 'A new user is created successfully';
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(@Param('id') id: number): Promise<User> {
    if (!Number(id)) {
      throw new BadRequestException('Invalid id');
    }
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async delete(@Param('id') id: number) {
    return await this.userRepository.delete(id);
  }

  findEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }
}
