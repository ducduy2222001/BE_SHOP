import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  id: string;

  @IsNotEmpty()
  @IsEmail()
  email_address: string;

  @IsNotEmpty()
  phone_number: number;

  @MinLength(8)
  @IsNotEmpty()
  password: number;
}
