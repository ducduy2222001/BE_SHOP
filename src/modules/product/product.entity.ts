import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Cart } from '../cart/cart.entity';
import { Order } from '../order/order.entity';
import { Review } from '../review/review.entity';
import { Category } from '../category/category.entity';
import { Promotion } from '../promotion/promotion.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  product_name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  quantity_in_stock: number;

  @Column()
  size: string;

  @Column()
  color: string;

  @Column()
  popular: boolean;

  @Column()
  sale: boolean;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @ManyToMany(() => Cart, (cart) => cart.product)
  cart: Cart[];

  @ManyToMany(() => Promotion, (promotion) => promotion.product)
  promotion: Promotion[];

  @ManyToOne(() => Category, (category) => category.product)
  category: Category;

  @OneToMany(() => Review, (review) => review.product)
  review: Review[];

  @ManyToMany(() => Order, (order) => order.product)
  order: Order[];
}
