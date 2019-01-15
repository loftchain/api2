import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

import {Customer} from '../customer/customer.entity';

@Entity()
export class Wallet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 255, nullable: true})
    currency: string;

    @Column({length: 255, nullable: true})
    wallet: string;

    @CreateDateColumn({type: 'timestamp', nullable: true})
    createdAt: string;

    @UpdateDateColumn({type: 'timestamp', nullable: true})
    updatedAt: string;

    @ManyToOne(type => Customer, customer => customer.wallet, {
        onDelete: 'CASCADE',
    })
    customer: Customer;
}
