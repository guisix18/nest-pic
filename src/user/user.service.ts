import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import validateCpf from './utils/verify-cpf';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserServices {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(dto: UserDto): Promise<UserDto> {
    const data: Prisma.UserCreateInput = {
      id: randomUUID(),
      name: dto.name,
      lastName: dto.lastName,
      email: dto.email,
      cpf: validateCpf(dto.cpf),
      password: bcrypt.hashSync(dto.password, 10),
      wallet: { create: { id: randomUUID(), balance: 300.0 } },
      shopman: dto.shopman && {
        create: { id: randomUUID() },
      },
    };

    const user = await this.prisma.user.create({
      data,
    });

    return { ...user, password: undefined };
  }
}
