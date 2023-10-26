import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FiltersTransactionDto, UserDto } from './dto/user.dto';
import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import validateCpf from './utils/verify-cpf';
import * as bcrypt from 'bcrypt';
import { select } from './utils/user.select';

@Injectable()
export class UserServices {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(dto: UserDto): Promise<UserDto> {
    console.log(dto);

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

  async listUsers(): Promise<UserDto[]> {
    const users = await this.prisma.user.findMany({
      select,
    });

    return users;
  }

  async findByEmail(email: string): Promise<UserDto> {
    return await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async sendCashToAnotherUser(
    idUser: string,
    filters: FiltersTransactionDto,
  ): Promise<string> {
    const { idUserToReceive, balanceToBeSent } = filters;

    const userLogged = await this.prisma.user.findFirst({
      where: {
        id: idUser,
      },
      include: {
        wallet: true,
        shopman: true,
      },
    });

    await this.prisma.$transaction(
      async (prismaTx: Prisma.TransactionClient) => {
        const userToReceive = await prismaTx.user.findFirst({
          where: {
            id: idUserToReceive,
          },
          include: {
            wallet: true,
            shopman: true,
          },
        });

        if (userLogged.shopman) {
          throw new HttpException(
            "As shopman you can't sent balance to this user",
            400,
          );
        }

        const userBalance = Number(userLogged.wallet.balance);

        if (userBalance < 0 || userBalance < Number(balanceToBeSent)) {
          throw new HttpException(
            "You don't have balance to proceed with this transaction",
            400,
          );
        }

        await prismaTx.user.update({
          where: {
            id: userToReceive.id,
          },
          data: {
            wallet: {
              update: {
                balance:
                  +userToReceive.wallet.balance + Number(balanceToBeSent),
              },
            },
          },
        });

        await prismaTx.user.update({
          where: {
            id: userLogged.id,
          },
          data: {
            wallet: {
              update: {
                balance: userBalance - Number(balanceToBeSent),
              },
            },
          },
        });
      },
    );
    return 'Transaction made with success';
  }
}
