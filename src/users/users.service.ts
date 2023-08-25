import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto, ChangePasswordDto, UpdateUserDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Order } from '../orders/order.entity';
import { OrdersService } from '../orders/orders.service';

const saltOrRounds = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> { 
    return await this.usersRepository.find();
  }

  async findUser(userId: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ 
      where: { id: parseInt(userId) }, 
      relations: ['orders']
    });
  }

  async findOnebyUsername(username: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ where: { username }});
  }

  async createUser(newUser: UserDto): Promise<User> {
    const username = newUser.username;
    const password = await bcrypt.hash(newUser.password, saltOrRounds);
    return this.usersRepository.save({username, password});
  }

  async deleteUser(userId: string): Promise<any> {
    return await this.usersRepository.delete({ id: parseInt(userId) });
  }

  async updateUser(userId: string, userData: UpdateUserDto): Promise<User> {
    const toUpdate = await this.usersRepository.findOne({ where: { id: parseInt(userId) } });

    if (!toUpdate) {
      throw new NotFoundException('User not found');
    }
    
    toUpdate.role = userData.role

    return this.usersRepository.save(toUpdate); 
  }
}

@Injectable()
export class UserActionsService {
  constructor(
    private ordersService: OrdersService,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async changePassword(user: any, userData: ChangePasswordDto): Promise<User> {
    console.log(user)
    const userToUpdate = await this.usersRepository.findOne({ where: { id: parseInt(user.userId) } });
    const newPasswordHash = await bcrypt.hash(userData.newPassword, saltOrRounds);

    if (userToUpdate && await bcrypt.compare(userData.currentPassword, userToUpdate.password)) {
      userToUpdate.password = newPasswordHash
      return this.usersRepository.save(userToUpdate)
    }
    return null;
  }

  async findUserOrders(user: any): Promise<Order[]> {
    return await this.ordersService.findOrdersByUserId(user.userId)
  }

  async createUserOrder(orderDetails: any, user: any): Promise<Order> {
    const userId = user.userId;
    const bookId = orderDetails.bookId;
    const orderData = { userId, bookId }
    return await this.ordersService.createOrder(orderData)
  }

  async updateUserOrderWithLoan(orderId: string, user: any): Promise<Order> {
    const userId = user.userId;
    const orderData = { userId, orderId }
    return await this.ordersService.upateOrderWithLoan(orderData)
  }

  async updateUserOrderWithReturn(orderId: string, user: any): Promise<Order> {
    const userId = user.userId;
    const orderData = { userId, orderId }
    return await this.ordersService.upateOrderWithReturn(orderData)
  }
}