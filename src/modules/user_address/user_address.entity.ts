import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../user/user.entity';

@Entity()
export class UserAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street_number: number;

  @Column()
  address_line: string;

  @Column()
  city: string;

  @Column()
  zip_code: number;

  @Column()
  country: string;

  @Column()
  is_default: boolean;

  @ManyToOne(() => User, (user) => user.user_address)
  user: User;
}
