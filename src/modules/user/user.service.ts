import { Repository } from 'typeorm';
import { ForbiddenException, Injectable } from '@nestjs/common';
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
      throw new ForbiddenException();
    }
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findEmail(email_address: string): Promise<User> {
    return this.userRepository.findOneBy({ email_address });
  }
}
