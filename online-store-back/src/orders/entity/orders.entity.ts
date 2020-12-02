import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/auth/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderItemsEntity } from './order-items.entity';

@Entity()
export class OrdersEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  userId?: string;

  @ApiProperty()
  @ManyToOne(type => UserEntity)
  @JoinColumn()
  user?: UserEntity;

  @ApiProperty()
  @OneToMany(
    () => OrderItemsEntity,
    item => item.order,
    {
      eager: true,
      cascade: true,
      nullable: false,
    },
  )
  items?: OrderItemsEntity[];

  @ApiProperty()
  @Column({ nullable: true })
  orderSum?: number;

  @ApiProperty()
  @Column({ type: 'boolean', nullable: false, default: false })
  isCanceled?: boolean;

  @ApiProperty()
  @Column({ type: 'boolean', nullable: false, default: false })
  isPaid?: boolean;

  @ApiProperty()
  @Column({ type: 'boolean', nullable: false, default: false })
  isDispatched?: boolean;

  @ApiProperty()
  @Column({ type: 'boolean', nullable: false, default: false })
  isDelivered?: boolean;

  @ApiProperty()
  @Column('varchar', {
    length: 128,
    nullable: false,
    default: '',
  })
  status?: string;

  @ApiProperty()
  @Column('varchar', {
    length: 512,
    nullable: false,
    default: '',
  })
  deliverAddress: string;

  @ApiProperty()
  @Column('varchar', {
    length: 512,
    nullable: false,
    default: '',
  })
  userNote?: string;

  @ApiProperty()
  @CreateDateColumn()
  createdOn?: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedOn?: Date;
}
