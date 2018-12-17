import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 50 })
  email: string;

  @Column('text')
  password: string;

  @Column({ type: 'timestamp' })
  createdAt: string;
}
