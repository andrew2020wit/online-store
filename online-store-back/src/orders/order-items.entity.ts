import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GoodsEntity } from './../goods/goods.entity';
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
    cascade: false,
    nullable: false,
  })
  orderId: OrdersEntity;

  @Field(type => GoodsEntity)
  @ManyToOne(() => GoodsEntity, {
    eager: true,
    cascade: false,
    nullable: false,
  })
  goodsId: GoodsEntity;

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
