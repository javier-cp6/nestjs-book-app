import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn,
  OneToMany, 
} from 'typeorm';
import { Order } from '../orders/order.entity';
import { Role } from 'src/enums/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn() 
  id: number;

  @Column({ length: 255 })
  username: string;

  @Column('text')
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.User})
  role: Role;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];
}