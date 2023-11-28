import * as bcrypt from 'bcrypt';
import { FindOptionsSelect, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  ConflictException,
  Param,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { User } from './user.entity';

const selectUser: string[] = [
  'id',
  'email',
  'phone_number',
  'first_name',
  'last_name',
  'created_at',
  'updated_at',
];

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
    return this.userRepository.find({
      select: selectUser as FindOptionsSelect<User>,
    });
  }

  async findOne(@Param('id') id: number): Promise<User> {
    const user = await this.validateUser(id);
    return user;
  }

  async delete(@Param('id') id: number) {
    const user = await this.validateUser(id);
    await this.userRepository.remove(user);
    return 'User deleted successfully';
  }

  async update(
    id: number,
    updateUserDto: Partial<User>,
  ): Promise<{ message: string; result: UpdateResult }> {
    const user = await this.validateUser(id);
    if (user) {
      const result = await this.userRepository.update(id, updateUserDto);
      return { message: 'User updated successfully', result };
    }
  }

  findEmail(first_name: string): Promise<User> {
    return this.userRepository.findOneBy({ first_name });
  }

  //validateUser chung cho mọi trường hợp trên
  private async validateUser(id: number) {
    if (!Number(id)) {
      throw new BadRequestException('Invalid id');
    }
    const user = await this.userRepository.findOne({
      where: { id },
      select: selectUser as FindOptionsSelect<User>,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
