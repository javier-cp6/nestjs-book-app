import { Module } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService, UserActionsService } from './users.service';
import { UserActionsController, UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from '../orders/orders.module';
import { EmailService } from 'src/utils/email.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    OrdersModule,
  ],
  providers: [UsersService, UserActionsService, EmailService],
  exports: [UsersService],
  controllers: [UsersController, UserActionsController]
})
export class UsersModule {}