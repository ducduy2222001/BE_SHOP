import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserAddressDto {
  @IsNotEmpty()
  street_number: number;

  @IsNotEmpty()
  address_line: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  @IsNumber()
  zip_code: number;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  is_default: boolean;
}
