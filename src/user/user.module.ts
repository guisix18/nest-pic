import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserServices } from './user.service';
import { UserController } from './user.controller';
import { VerifyParamsAvailabilityMiddleware } from './middleware/verify-params-availability.middleware';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserServices],
  exports: [UserServices],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyParamsAvailabilityMiddleware).forRoutes({
      path: '/user',
      method: RequestMethod.POST,
    });
  }
}
