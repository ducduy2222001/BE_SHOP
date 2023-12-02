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
import { Role } from '../role/role.entity';

const selectUser: string[] = [
  'id',
  'email',
  'phone_number',
  'first_name',
  'last_name',
  'role',
  'created_at',
  'updated_at',
];

interface IUserBase {
  password: string;
  role: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async create(user: IUserBase): Promise<string> {
    let userRole = await this.roleRepository.findOne({
      where: { role_name: user.role },
    });

    if (!userRole) {
      userRole = this.roleRepository.create({ role_name: user.role });
      await this.roleRepository.save(userRole);
    }

    user.password = bcrypt.hashSync(user.password, 8);
    user.role = userRole.role_name;
    const newUser = this.userRepository.create({
      ...user,
      password: user.password,
      role: userRole,
    });

    try {
      await this.userRepository.save(newUser);
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

  async findOneRole(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['role'],
    });
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
