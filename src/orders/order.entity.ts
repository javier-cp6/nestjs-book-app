import { 
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { Book } from '../books/book.entity';
import { User } from '../users/user.entity';
import { OrderStatus } from '../enums/order.enum';

@Entity('bookOrder')
export class Order {
  @PrimaryGeneratedColumn() 
  id: number;

  @ManyToOne(() => User, user => user.orders)
  user: User;

  @RelationId((order: Order) => order.user)
  userId: number;

  @ManyToOne(() => Book, book => book.orders)
  book: Book;

  @RelationId((order: Order) => order.book)
  bookId: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.Reserved })
  status: OrderStatus;

  @Column({ type: 'timestamp', nullable: true })
  loanDate: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  expirationDate: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  returnDate: Date | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;
}