import { IsNotEmpty, IsEmail, MinLength, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MinLength(8)
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  phone_number: number;

  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  role: string;
}
