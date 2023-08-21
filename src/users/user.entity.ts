import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn,
  OneToMany, 
} from 'typeorm';
import { Order } from '../orders/order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn() 
  id: number;

  @Column({ length: 255 })
  username: string;

  @Column('text')
  password: string;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];
}