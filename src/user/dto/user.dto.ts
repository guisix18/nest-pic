import { Decimal } from '@prisma/client/runtime/library';
import {
  IsDecimal,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export interface Shopman {
  id: string;
  userId: string;
}

// wallet.model.ts
export interface Wallet {
  id: string;
  balance: Decimal;
}

export class UserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  lastName: string;

  @IsEmail(undefined, { message: 'Email not valid' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'The password has to be greater or equal than 8' })
  password: string;

  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsOptional()
  shopman?: Shopman | null;

  @IsOptional()
  wallet?: Wallet | null;
}

export class FiltersTransactionDto {
  @IsString()
  @IsNotEmpty()
  idUserToReceive: string;

  @IsDecimal()
  @IsNotEmpty()
  balanceToBeSent: string;
}
