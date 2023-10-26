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
import { FiltersTransactionDto, UserDto } from './dto/user.dto';
import { Request, Response } from 'express';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { User } from '@prisma/client';

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
  ): Promise<Response<string>> {
    const { id } = request.user as User;

    const transaction = await this.userServices.sendCashToAnotherUser(
      id,
      filters,
    );

    return response.json(transaction);
  }
}
