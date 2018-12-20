import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';

import {Customer} from '../customer/customer.entity';

@Entity()
export class Wallet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 255, nullable: true})
    currency: string;

    @Column({length: 255, nullable: true})
    wallet: string;

    @Column('timestamp')
    date: string;

    @ManyToOne(type => Customer, customer => customer.wallet, {
        onDelete: 'CASCADE',
    })
    customer: Customer;
}
