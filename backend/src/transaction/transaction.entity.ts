import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {Customer} from '../customer/customer.entity';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class Transaction {
    @ApiModelProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiModelProperty()
    @Column({length: 35, nullable: true})
    currency: string;

    @ApiModelProperty()
    @Column({length: 255, nullable: true})
    txId: string;

    @ApiModelProperty()
    @Column({length: 255, nullable: true})
    from: string;

    @ApiModelProperty()
    @Column({type: 'double', nullable: true})
    amount: number;

    @ApiModelProperty()
    @Column({type: 'datetime', nullable: true})
    date: string;

    @ApiModelProperty()
    @Column({length: 255, nullable: true})
    status: string;

    @ApiModelProperty()
    @CreateDateColumn({type: 'timestamp', nullable: true})
    createdAt: string;

    @ApiModelProperty()
    @UpdateDateColumn({type: 'timestamp', nullable: true})
    updatedAt: string;

    @ApiModelProperty()
    @ManyToOne(type => Customer, customer => customer.transaction, {
        onDelete: 'CASCADE',
    })
    customer: Customer;
}
