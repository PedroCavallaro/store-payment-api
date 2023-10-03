import { IsNotEmpty, IsNumber, MinLength } from 'class-validator';
export class ProductDto {
  @IsNotEmpty()
  id: string;
  @MinLength(5)
  name: string;
  @IsNumber()
  unit_value: number;
  @IsNumber()
  amount: number;
}
