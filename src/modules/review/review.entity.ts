import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Order } from '../order/order.entity';
import { Product } from '../product/product.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  comment: string;

  @Column()
  rating: number;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @ManyToOne(() => Product, (product) => product.review)
  product: Product;

  @OneToOne(() => Order)
  @JoinColumn()
  order: Order;
}
