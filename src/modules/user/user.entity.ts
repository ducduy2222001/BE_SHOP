import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserAddress } from '../user_address/user_address.entity';
import { Role } from '../role/role.entity';
import { Cart } from '../cart/cart.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  phone_number: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => UserAddress, (user_address) => user_address.user)
  user_address: UserAddress[];

  @ManyToOne(() => Role, (role) => role.user)
  role: Role;

  @OneToOne(() => Cart)
  @JoinColumn()
  cart: Cart;
}
