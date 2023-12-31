import { 
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../enums/role.enum';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('orders') 
@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('access-token') 
@Roles(Role.Admin)
export class OrdersController {
  constructor (private readonly ordersService: OrdersService) {}

  @Get()
  findAll(@Req() request: Request): Promise<Order[]> {
    return this.ordersService.findAll();
  }
}
