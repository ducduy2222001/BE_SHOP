import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Order } from '../order/order.entity';

@Entity()
export class OrderStatus {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  status_name: string;

  @Column()
  status_date: string;

  @Column()
  is_cancel_order: boolean;

  @OneToMany(() => Order, (order) => order.order_status)
  order: Order[];
}
