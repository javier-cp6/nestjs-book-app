import { 
  Controller, 
  Get, 
  Post,
  Put,
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
import { Role } from '../enums/role.enum';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  findAll(@Req() request: Request): Promise<User[]> { 
    return this.usersService.findAll(); 
  }

  @Get(':userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  findUser(@Param('userId') userId: string): Promise<User> {
    return this.usersService.findUser(userId);
  }

  @Post()
  createUser(@Body() newUser: UserDto): Promise<User> {
    return this.usersService.createUser(newUser);
  }

  @Delete(':userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  deleteUser(@Param('userId') userId: string): Promise<User> {
    return this.usersService.deleteUser(userId)
  }

  @Put(':userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  updateUser(
    @Param('userId') userId: string,
    @Body() userData: any
  ): Promise<User> {
    return this.usersService.updateUser(userId, userData);
  }
}

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserActionsController {
  constructor(private readonly userActionsService: UserActionsService) {}

  @Get('orders')
  findUserOrders(@Req() request: Request): Promise<Order[]> {
    return this.userActionsService.findUserOrders(request.user);
  }

  @Post('orders')
  createUserOrder(@Req() request: Request): Promise<Order> {
    const postData = request.body;
    const user = request.user;
    return this.userActionsService.createUserOrder(postData, user);
  }

  @Put('orders/:orderId/borrow')
  updateUserOrderWithLoan(@Req() request: Request, @Param('orderId') orderId: string): Promise<Order> {
    return this.userActionsService.updateUserOrderWithLoan(orderId, request.user);
  }

  @Put('orders/:orderId/return')
  updateUserOrderWithReturn(@Req() request: Request, @Param('orderId') orderId: string): Promise<Order> {
    return this.userActionsService.updateUserOrderWithReturn(orderId, request.user);
  }
}