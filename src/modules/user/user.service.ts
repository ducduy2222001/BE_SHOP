import { Repository } from 'typeorm';
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
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

  findEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }
}
