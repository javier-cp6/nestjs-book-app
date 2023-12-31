import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Order } from '../orders/order.entity';
import { BookStatus, BookLanguage } from '../enums/book.enum';

@Entity()
export class Book {
  @PrimaryGeneratedColumn() 
  id: number;

  @Column()
  title: string;

  @Column()
  genre: string;

  @Column('text') 
  description: string;

  @Column()
  author: string;

  @Column()
  publisher: string;

  @Column()
  pages: number;

  @Column()
  image_url: string;

  @Column()
  publication_year: number;

  @Column()
  isbn: string;

  @Column({ type: 'enum', enum: BookLanguage })
  language: BookLanguage;

  @Column({ type: 'enum', enum: BookStatus, default: BookStatus.Available })
  status: BookStatus;

  @OneToMany(() => Order, order => order.book)
  orders: Order[];
}