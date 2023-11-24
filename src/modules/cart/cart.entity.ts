import {
  Column,
  Entity,
  JoinTable,
  JoinColumn,
  OneToOne,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  status: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  total_price: number;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @ManyToMany(() => Product, (product) => product.cart)
  @JoinTable()
  product: Product[];

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
