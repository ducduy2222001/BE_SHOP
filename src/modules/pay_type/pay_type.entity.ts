import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Payment } from '../payment/payment.entity';

@Entity()
export class PayType {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  type_name: string;

  @OneToMany(() => Payment, (payment) => payment.pay_type)
  payment: Payment[];
}
