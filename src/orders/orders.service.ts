import { Injectable } from '@nestjs/common';
import { Order } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDto } from './order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
  ) {}

  async findAll(): Promise<Order[]> { 
    return await this.ordersRepository.find({
      relations: ['book']
    });
  }

  async findOrdersByUserId(userId: string): Promise<Order[]> {
    return await this.ordersRepository.find({ 
      where: { 
        user: { id: parseInt(userId) }
      },
      relations: ['book']
    })
  }

  async createOrder(orderData: OrderDto): Promise<Order> {
    const newOrder = this.ordersRepository.create();
    newOrder.user = { id: orderData.userId } as any;
    newOrder.book = { id: orderData.bookId } as any;
    return await this.ordersRepository.save(newOrder);
  }
}
