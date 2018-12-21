import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiModelProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiModelProperty()
  @Column({ length: 100 })
  name: string;

  @ApiModelProperty()
  @Column({ length: 50 })
  email: string;

  @ApiModelProperty()
  @Column('text')
  password: string;

  @ApiModelProperty()
  @Column({ type: 'timestamp', nullable: true })
  createdAt: string;
}
