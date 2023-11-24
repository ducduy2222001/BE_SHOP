import { IsNotEmpty } from 'class-validator';

export class CreatePromotionDto {
  @IsNotEmpty()
  promotion_name: string;

  @IsNotEmpty()
  discount_percentage: number;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  EndDate: Date;
}
