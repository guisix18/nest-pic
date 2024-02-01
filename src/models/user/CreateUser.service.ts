import { User } from '../../../src/entities/user.entity';
import { IUserRepository } from '../../../src/repositories/IUserRepositories';

interface IUserRequest {
  name: string;
  lastName: string;
  email: string;
  password: string;
  cpf: string;
}

export class CreateUserService {
  constructor(private usersRepository: IUserRepository) {}

  async execute({ name, lastName, email, password, cpf }: IUserRequest) {
    const allUsers = User.list();

    const findSomeUser = allUsers.find(
      (user) => user.email === email || user.cpf === cpf,
    );

    if (findSomeUser) throw new Error('User already exists');

    const userCreate = User.create({ name, lastName, email, password, cpf });
    const user = await this.usersRepository.create(userCreate);

    return user;
  }
}
