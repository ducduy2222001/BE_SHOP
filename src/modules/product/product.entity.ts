import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cart } from '../cart/cart.entity';
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

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @ManyToMany(() => Cart, (cart) => cart.product)
  cart: Cart[];

  @ManyToMany(() => Promotion, (promotion) => promotion.product)
  promotion: Promotion[];
}
