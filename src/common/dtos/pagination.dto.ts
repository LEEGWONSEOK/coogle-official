import { IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page: number;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(50)
  perpage: number;
}
