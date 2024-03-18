import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { USER_EXISTS } from '../utils/messages';

@Injectable()
export class VerifyParamsAvailabilityMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}

  async use(request: Request, _, next: NextFunction) {
    const { email, cpf } = request.body;

    const findUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { cpf }],
      },
    });

    if (findUser) throw new HttpException(USER_EXISTS, HttpStatus.BAD_REQUEST);

    next();
  }
}
