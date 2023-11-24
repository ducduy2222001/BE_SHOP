import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';
import { Payment } from '../payment/payment.entity';
import { OrderStatus } from '../order_status/order_status.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  order_date: Date;

  @Column()
  ship_date: Date;

  @Column()
  total_amount: number;

  @ManyToOne(() => User, (user) => user.order)
  user: User;

  @ManyToOne(() => OrderStatus, (order_status) => order_status.order)
  order_status: OrderStatus;

  @ManyToMany(() => Product, (product) => product.order)
  @JoinTable()
  product: Product[];

  @ManyToOne(() => Payment, (payment) => payment.order)
  payment: Payment;
}
