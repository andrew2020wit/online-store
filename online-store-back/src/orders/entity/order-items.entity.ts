import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrdersEntity } from './orders.entity';

@ObjectType()
@Entity()
export class OrderItemsEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(type => OrdersEntity)
  @ManyToOne(() => OrdersEntity, {
    eager: true,
    cascade: true,
    nullable: false,
  })
  orderId: OrdersEntity;

  goodsId: string;

  @Field({ description: `count` })
  @Column({ nullable: true, default: 1 })
  count: number;

  @Field()
  @Column({ type: 'boolean', nullable: false, default: false })
  isCanceled: boolean;

  @Field({ description: `price` })
  @Column({ nullable: true, default: null })
  price: number;

  @Field()
  @CreateDateColumn()
  createdOn: Date;

  @Field()
  @UpdateDateColumn()
  updatedOn: Date;
}
