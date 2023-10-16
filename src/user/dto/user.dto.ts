import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export interface Shopman {
  id: string;
  userId: string;
  user: UserDto;
}

// wallet.model.ts
export interface Wallet {
  id: string;
  balance: number;
  user: UserDto | null;
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
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, {
    message: 'Password to weak',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  cpf: string;

  shopman?: Shopman | null;

  wallet?: Wallet | null;
}
