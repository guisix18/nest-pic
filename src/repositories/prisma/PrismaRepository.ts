import { prisma } from '../../../prisma/client/client';
import { User } from '../../../src/entities/user.entity';
import { IUserRepository } from '../IUserRepositories';
import { randomUUID } from 'crypto';
import { IWalletRepository } from '../IWalletRepositories';
import { Wallet } from 'src/entities/wallet.entity';

class PrismaUsersRepository implements IUserRepository {
  async create({ name, lastName, email, password, cpf }): Promise<User> {
    const user = await prisma.user.create({
      data: {
        id: randomUUID(),
        name,
        lastName,
        email,
        password,
        cpf,
      },
    });

    return user;
  }

  async list(): Promise<User[]> {
    const users = await prisma.user.findMany({});

    return users;
  }
}

//Ainda tenho que implementar o repository da carteira, não faço idéia de como vai seguir sinceramente(vou pensar)
// class PrismaWalletRepository implements IWalletRepository {
//   create({ balance }: Wallet): Promise<Wallet> {
//     const wallet = await prisma.wallet.create
//   }
// }

export { PrismaUsersRepository };
