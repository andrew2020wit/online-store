import { Field, ObjectType } from '@nestjs/graphql';
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

@ObjectType()
@Entity()
export class OrdersEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({
    nullable: false,
  })
  userId: string;

  @ManyToOne(type => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @Field(type => OrderItemsEntity)
  @OneToMany(
    () => OrderItemsEntity,
    item => item.orderId,
    {
      eager: true,
      cascade: true,
      nullable: false,
    },
  )
  items: OrderItemsEntity[];

  @Field()
  @Column({ type: 'boolean', nullable: false, default: false })
  isCanceled: boolean;

  @Field()
  @Column({ type: 'boolean', nullable: false, default: false })
  isPaid: boolean;

  @Field()
  @Column({ type: 'boolean', nullable: false, default: false })
  isDispatched: boolean;

  @Field()
  @Column({ type: 'boolean', nullable: false, default: false })
  isDelivered: boolean;

  @Field()
  @Column('varchar', {
    length: 128,
    nullable: false,
    default: '',
  })
  status: string;

  @Field()
  @Column('varchar', {
    length: 512,
    nullable: false,
    default: '',
  })
  deliverAddress: string;

  @Field()
  @Column('varchar', {
    length: 512,
    nullable: false,
    default: '',
  })
  userNote: string;

  @Field()
  @CreateDateColumn()
  createdOn: Date;

  @Field()
  @UpdateDateColumn()
  updatedOn: Date;
}
