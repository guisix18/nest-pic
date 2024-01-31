import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { UserServices } from './user.service';
import { UserDto } from './dto/user.dto';
import { FiltersTransactionDto } from './dto/filterTransaction.dto';
import { Request, Response } from 'express';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserFromJwt } from 'src/auth/models/UserFromJwt';

@Controller('user')
export class UserController {
  constructor(private readonly userServices: UserServices) {}

  @IsPublic()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body() data: UserDto,
    @Res() response: Response,
  ): Promise<Response<UserDto>> {
    const user = await this.userServices.createUser(data);

    return response.json(user);
  }

  @IsPublic()
  @Get()
  @HttpCode(HttpStatus.OK)
  async listUsers(@Res() response: Response): Promise<Response<UserDto[]>> {
    const users = await this.userServices.listUsers();

    return response.json(users);
  }

  @Post('/make-transaction')
  @HttpCode(HttpStatus.OK)
  async sendCashToAnotherUser(
    @Res() response: Response,
    @Req() request: Request,
    @Query() filters: FiltersTransactionDto,
    @CurrentUser() user: UserFromJwt,
  ): Promise<Response<string>> {
    const transaction = await this.userServices.sendCashToAnotherUser(
      user,
      filters,
    );

    return response.json(transaction);
  }
}
