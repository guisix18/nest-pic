import { prisma } from '../../../prisma/client/client';
import { User } from '../../../src/entities/user.entity';
import { IUserRepository } from '../IUserRepositories';
import { randomUUID } from 'crypto';

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

export { PrismaUsersRepository };
