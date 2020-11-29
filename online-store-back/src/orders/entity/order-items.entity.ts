import { Field, ObjectType } from '@nestjs/graphql';
import { GoodsEntity } from 'src/goods/goods.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrdersEntity } from './orders.entity';

@ObjectType()
@Entity()
export class OrderItemsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => OrdersEntity)
  orderId: OrdersEntity;

  @Field()
  @Column({
    nullable: false,
  })
  goodsId: string;

  @Field(type => GoodsEntity)
  @ManyToOne(type => GoodsEntity, {
    eager: true,
    cascade: false,
    nullable: false,
  })
  @JoinColumn()
  goods: GoodsEntity;

  @Field({ description: `count` })
  @Column({ nullable: true, default: 1 })
  count: number;

  @Field()
  @Column({ type: 'boolean', nullable: false, default: false })
  isCanceled: boolean;

  @Field({ description: `price` })
  @Column({ nullable: false })
  price: number;

  @Field({ description: `currency` })
  @Column({ nullable: false, default: '' })
  currency: string;

  @Field()
  @CreateDateColumn()
  createdOn: Date;

  @Field()
  @UpdateDateColumn()
  updatedOn: Date;
}
