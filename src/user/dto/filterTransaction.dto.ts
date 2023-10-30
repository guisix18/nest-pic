import { IsDecimal, IsNotEmpty, IsString } from 'class-validator';

export class FiltersTransactionDto {
  @IsString()
  @IsNotEmpty()
  idUserToReceive: string;

  @IsDecimal()
  @IsNotEmpty()
  balanceToBeSent: string;
}
