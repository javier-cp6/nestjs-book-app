import { 
  Controller, 
  Get, 
  Post,
  Delete,
  Param,
  Req,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UsersService, UserActionsService } from './users.service';
import { User } from './user.entity';
import { Order } from '../orders/order.entity';
import { UserDto } from './user.dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Req() request: Request): Promise<User[]> { 
    return this.usersService.findAll(); 
  }

  @Get(':userId')
  findUser(@Param('userId') userId: string): Promise<User> {
    return this.usersService.findUser(userId);
  }

  @Post()
  createUser(@Body() newUser: UserDto): Promise<User> {
    return this.usersService.createUser(newUser);
  }

  @Delete(':userId')
  deleteUser(@Param('userId') userId: string): Promise<User> {
    return this.usersService.deleteUser(userId)
  }
}

@Controller('user')
export class UserActionsController {
  constructor(private readonly userActionsService: UserActionsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('orders')
  findUserOrders(@Req() request: Request): Promise<Order[]> {
    return this.userActionsService.findUserOrders(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('orders')
  createUserOrder(@Req() request: Request): Promise<Order> {
    const postData = request.body;
    const user = request.user;
    return this.userActionsService.createUserOrder(postData, user);
  }
}