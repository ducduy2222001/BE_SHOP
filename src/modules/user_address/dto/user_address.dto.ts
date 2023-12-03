import { IsNotEmpty } from 'class-validator';

export class CreateUserAddressDto {
  @IsNotEmpty()
  street_number: number;

  @IsNotEmpty()
  address_line: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  zip_code: number;

  @IsNotEmpty()
  country: string;

  is_default: boolean;
}
