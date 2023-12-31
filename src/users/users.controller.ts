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
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService, UserActionsService } from './users.service';
import { User } from './user.entity';
import { Order } from '../orders/order.entity';
import { ChangePasswordDto, UpdateUserDto, UserDto } from './user.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '../enums/role.enum';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { OrderDto } from 'src/orders/order.dto';

@ApiTags('users') 
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('access-token') 
  @Roles(Role.Admin)
  findAll(@Req() request: Request): Promise<User[]> { 
    return this.usersService.findAll(); 
  }

  @Get(':userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('access-token') 
  @Roles(Role.Admin)
  findUser(@Param('userId') userId: string): Promise<User> {
    return this.usersService.findUser(userId);
  }

  @Post()
  createUser(@Body() newUser: UserDto): Promise<any> {
    return this.usersService.createUser(newUser);
  }

  @Delete(':userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('access-token') 
  @Roles(Role.Admin)
  deleteUser(@Param('userId') userId: string): Promise<User> {
    return this.usersService.deleteUser(userId)
  }

  @Put(':userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('access-token') 
  @Roles(Role.Admin)
  updateUser(
    @Param('userId') userId: string,
    @Body() userData: UpdateUserDto
  ): Promise<User> {
    return this.usersService.updateUser(userId, userData);
  }
}

@ApiTags('user actions') 
@Controller('user')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token') 
export class UserActionsController {
  constructor(private readonly userActionsService: UserActionsService) {}

  @Post('changePassword')
  async changePassword(@Req() request: Request, @Body() userData: ChangePasswordDto): Promise<any> {
    try {
      const result = await this.userActionsService.changePassword(request.user, userData);
      if (result) {
        return { message: 'Password changed successfully' };
      } else {
        throw new BadRequestException('Failed to change password');
      }
    } catch (error) {
      throw new InternalServerErrorException('Password change failed');
    }
  }

  @Get('orders')
  findUserOrders(@Req() request: Request): Promise<Order[]> {
    return this.userActionsService.findUserOrders(request.user);
  }

  @Post('orders')
  createUserOrder(@Body() order:OrderDto, @Req() request: Request): Promise<Order> {
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