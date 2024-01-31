import { Transform } from 'class-transformer';
import { IsDecimal, IsNotEmpty, IsString } from 'class-validator';

export class FiltersTransactionDto {
  @IsString()
  @IsNotEmpty()
  idUserToReceive: string;

  @IsNotEmpty()
  @Transform((a) => +a.value)
  balanceToBeSent: number;
}
