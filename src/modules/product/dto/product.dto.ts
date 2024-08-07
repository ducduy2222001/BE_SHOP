import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  product_name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  quantity_in_stock: number;

  @IsNotEmpty()
  size: string;

  @IsNotEmpty()
  color: string;

  popular: boolean;

  sale: boolean;
}
