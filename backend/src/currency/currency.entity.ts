import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class Currency {
    @ApiModelProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiModelProperty()
    @Column({length: 35, nullable: true})
    pair: string;

    @ApiModelProperty()
    @Column({length: 255, nullable: true})
    price: string;

    @ApiModelProperty()
    @Column({length: 255, nullable: true})
    timestamp: string;

    @ApiModelProperty()
    @Column('timestamp')
    createdAt: string;
}
