import { User } from '../../src/entities/user.entity';
import * as cpf from 'node-cpf';
import { CreateUserService } from '../../src/models/user/CreateUser.service';
import { CreateUserController } from '../../src/models/user/CreateUser.controller';
import { IUserRepository } from '../../src/repositories/IUserRepositories';
import { TestingModule, Test } from '@nestjs/testing';
import { InMemoryRepository } from '../../src/repositories/in-memory/user.model';

describe('Testing Users Services about creation', () => {
  let userServices: CreateUserService;
  let userControllers: CreateUserController;
  let userRepository: IUserRepository;
  let sameCpf: string = cpf.generate();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateUserController],
      providers: [CreateUserService],
    }).compile();

    userRepository = new InMemoryRepository();
    userServices = new CreateUserService(userRepository);
    userControllers = module.get<CreateUserController>(CreateUserController);
  });

  it('Should be able to create a new user', async () => {
    const userData: User = {
      name: 'John',
      lastName: 'Doe',
      email: 'test@mail.com',
      password: '12345678Gu',
      cpf: cpf.generate(),
    };

    const user = await userServices.execute(userData);

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('isActive');
    expect(user.isActive).toBe(true);
  });

  it('Should not be able to create a new user with the same email', async () => {
    const userData: User = {
      name: 'John',
      lastName: 'Doe',
      email: 'test@mail.com',
      password: '12345678Gu',
      cpf: cpf.generate(),
    };

    expect(userServices.execute(userData)).rejects.toEqual(
      new Error('User already exists'),
    );
  });

  it('Should not be able to create a new user with the same CPF', async () => {
    const userData: User = {
      name: 'Mano',
      lastName: 'Jow',
      email: 'testing@mail.com',
      password: '12345678Gu',
      cpf: sameCpf,
    };

    await userServices.execute(userData);

    expect(userServices.execute(userData)).rejects.toEqual(
      new Error('User already exists'),
    );
  });
});
