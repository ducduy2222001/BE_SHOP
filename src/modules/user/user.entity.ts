import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email_address: string;

  @Column()
  phone_number: string;

  @Column()
  password: string;
}
