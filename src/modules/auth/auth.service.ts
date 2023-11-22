import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findEmail(email);
    const comparePass = bcrypt.compareSync(pass, user.password);

    if (comparePass === false) {
      throw new UnauthorizedException('Invalid user credentials');
    }

    const payload = { sub: user.id, email: user.email };
    return {
      id: user.id,
      phone: user.phone_number,
      email: user.email,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
