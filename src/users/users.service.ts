import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto, ChangePasswordDto } from './user.dto';
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

  async changePassword(userData: ChangePasswordDto): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { username: userData.username } });
    const newPasswordHash = await bcrypt.hash(userData.newPassword, saltOrRounds);

    if (user && await bcrypt.compare(userData.currentPassword, user.password)) {
      user.password = newPasswordHash
      return this.usersRepository.save(user)
    }
    return null;
  }
}

@Injectable()
export class UserActionsService {
  constructor(
    private ordersService: OrdersService,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findUserOrders(user: any): Promise<Order[]> {
    return await this.ordersService.findOrdersByUserId(user.userId)
  }

  async createUserOrder(orderDetails: any, user: any): Promise<Order> {
    const userId = user.userId;
    const bookId = orderDetails.bookId;
    const orderData = { userId, bookId }
    return await this.ordersService.createOrder(orderData)
  }
}