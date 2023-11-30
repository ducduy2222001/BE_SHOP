import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(first_name: string, pass: string): Promise<any> {
    const user = await this.usersService.findEmail(first_name);
    const userRole = await this.usersService.findOneRole(user.id);

    const comparePass = bcrypt.compareSync(pass, user.password);

    if (comparePass === false) {
      throw new UnauthorizedException('Invalid user credentials');
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: userRole.role.role_name,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
