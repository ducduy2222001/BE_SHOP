import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  id: string;

  @IsNotEmpty()
  @IsEmail()
  email_address: string;

  @IsNotEmpty()
  phone_number: string;

  @IsNotEmpty()
  password: string;
}
