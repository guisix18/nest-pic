import { Test, TestingModule } from '@nestjs/testing';
import { UserServices } from '../src/user/user.service';
import { PrismaService } from '../src/prisma/prisma.service';

jest.mock('../prisma/prisma.service');

//CONTINUAR CONFIGURAÇÃO DEPOIS

describe('UserServices', () => {
  let userServices: UserServices;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserServices, PrismaService],
    }).compile();

    userServices = module.get<UserServices>(UserServices);
    prismaService = module.get<PrismaService>(PrismaService);
  });
});
