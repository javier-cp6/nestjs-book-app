import { Injectable } from '@nestjs/common';
import { Order } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDto, UpdateOrderDto } from './order.dto';
import { BooksService } from 'src/books/books.service';

enum OrderStatus {
  Reserved = 'reserved',
  Borrowed = 'borrowed',
  Returned = 'returned',
  Cancelled = 'cancelled',
}

enum BookStatus {
  Available = 'available',
  Reserved = 'reserved',
  OnLoan = 'on loan',
}

@Injectable()
export class OrdersService {
  constructor(
    private booksService: BooksService,
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

    const bookData = { status : BookStatus.Reserved }
    await this.booksService.updateBook(orderData.bookId, bookData);

    return await this.ordersRepository.save(newOrder);
  }

  async upateOrderWithLoan(orderData: UpdateOrderDto): Promise<Order> {
    const orderId = parseInt(orderData.orderId);
    const userId = parseInt(orderData.userId);
    const toUpdate = await this.ordersRepository.findOne({
      where: { 
        id: orderId,
        user: { id: userId }
      },
    });
    
    const currentDate = new Date();
    
    const expirationDate = new Date();
    expirationDate.setDate(currentDate.getDate() + 10);

    toUpdate.status = OrderStatus.Borrowed;
    toUpdate.loanDate = currentDate;
    toUpdate.expirationDate = expirationDate;

    const bookId = toUpdate.bookId.toString()
    const bookData = { status : BookStatus.OnLoan }
    await this.booksService.updateBook(bookId, bookData);

    return this.ordersRepository.save(toUpdate); 
  }

  async upateOrderWithReturn(orderData: UpdateOrderDto): Promise<Order> {
    const orderId = parseInt(orderData.orderId);
    const userId = parseInt(orderData.userId);
    const toUpdate = await this.ordersRepository.findOne({
      where: { 
        id: orderId,
        user: { id: userId }
      },
    });
    
    const currentDate = new Date();

    toUpdate.status = OrderStatus.Returned;
    toUpdate.returnDate = currentDate;

    const bookId = toUpdate.bookId.toString()
    const bookData = { status : BookStatus.Available }
    await this.booksService.updateBook(bookId, bookData);

    return this.ordersRepository.save(toUpdate); 
  }
}
