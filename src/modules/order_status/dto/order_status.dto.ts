import { IsNotEmpty } from 'class-validator';

export class CreateOrderStatusDto {
  @IsNotEmpty()
  status_name: string;

  status_date: Date;

  is_cancel_order: boolean;
}
