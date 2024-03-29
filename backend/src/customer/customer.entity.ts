import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    JoinColumn,
    JoinTable,
    RelationCount,
    CreateDateColumn, UpdateDateColumn
} from 'typeorm';
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
    @CreateDateColumn({type: 'timestamp', nullable: true})
    createdAt: string;

    @ApiModelProperty()
    @UpdateDateColumn({type: 'timestamp', nullable: true})
    updatedAt: string;

    @OneToMany(type => Transaction, transaction => transaction.customer, {
        eager: true,
    })
    transaction: Transaction[];

    @ApiModelProperty()
    @OneToMany(type => Wallet, wallet => wallet.customer, {
        eager: true,
    })
    wallet: Wallet[];
}
