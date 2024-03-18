import { Request, Response } from 'express';
import { CreateUserService } from './CreateUser.service';
import { Controller } from '@nestjs/common';

@Controller()
class CreateUserController {
  constructor(private createUser: CreateUserService) {}

  async handle(request: Request, response: Response) {
    const { name, lastName, email, password, cpf } = request.body;
    const user = await this.createUser.execute({
      name,
      lastName,
      email,
      password,
      cpf,
    });

    return response.json(user);
  }
}

export { CreateUserController };
