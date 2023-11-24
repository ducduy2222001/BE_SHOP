import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../user/user.entity';
import { Order } from '../order/order.entity';
import { PayType } from '../pay_type/pay_type.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  amount: number;

  @Column()
  payment_date: Date;

  @ManyToOne(() => User, (user) => user.payment)
  user: User;

  @OneToMany(() => Order, (order) => order.payment)
  order: Order[];

  @ManyToOne(() => PayType, (pay_type) => pay_type.payment)
  pay_type: PayType;
}
