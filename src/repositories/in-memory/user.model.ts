import { User } from '@prisma/client';
import { IUserRepository } from '../IUserRepositories';
import { randomUUID } from 'crypto';

class InMemoryRepository implements IUserRepository {
  public users: User[] = [];

  async create(userData: User): Promise<User> {
    Object.assign(userData, {
      id: randomUUID(),
    });

    this.users.push(userData);

    return userData;
  }

  async list(): Promise<User[]> {
    return this.users;
  }
}

export { InMemoryRepository };
