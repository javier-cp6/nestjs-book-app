import { 
  Controller,
  Get,
  Req,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { Request } from 'express';

@Controller('orders')
export class OrdersController {
  constructor (private readonly ordersService: OrdersService) {}

  @Get()
  findAll(@Req() request: Request): Promise<Order[]> {
    return this.ordersService.findAll();
  }
}
