import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../product/product.entity';

@Entity()
export class Promotion {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  promotion_name: string;

  @Column()
  discount_percentage: number;

  @Column()
  description: string;

  @Column()
  startDate: Date;

  @Column()
  EndDate: Date;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @ManyToMany(() => Product, (product) => product.promotion)
  @JoinTable()
  product: Product[];
}
