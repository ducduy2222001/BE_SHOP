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

  async signIn(email_address: string, pass: string): Promise<any> {
    const user = await this.usersService.findEmail(email_address);
    const comparePass = bcrypt.compareSync(pass, user.password);

    if (comparePass === false) {
      throw new UnauthorizedException('Invalid user credentials');
    }

    const payload = { sub: user.id, email_address: user.email_address };
    return {
      id: user.id,
      phone: user.phone_number,
      email_address: user.email_address,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
