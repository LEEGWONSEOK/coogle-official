import { IsInt, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationDto {
  @Transform((value) => +value)
  @IsInt()
  @Min(0)
  page: number;

  @Transform((value) => +value)
  @IsInt()
  @Min(1)
  @Max(50)
  perpage: number;
}
