import {Column, Entity, OneToMany, PrimaryGeneratedColumn, JoinColumn, JoinTable, RelationCount} from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

import {Transaction} from '../transaction/transaction.entity';
import {Wallet} from '../wallet/wallet.entity';

@Entity()
export class Customer {
    @ApiModelProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiModelProperty()
    @Column({length: 35, nullable: true})
    name: string;

    @ApiModelProperty()
    @Column('timestamp')
    date: string;

    @OneToMany(type => Transaction, transaction => transaction.customer)
    transaction: Transaction[];

    @ApiModelProperty()
    @OneToMany(type => Wallet, wallet => wallet.customer, {
        eager: true,
    })
    wallet: Wallet[];
}
