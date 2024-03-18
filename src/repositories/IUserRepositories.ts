import { User } from '../../src/entities/user.entity';

interface IUserRepository {
  create(user: User): Promise<User>;
  list(): Promise<User[]>;
}

export { IUserRepository };
