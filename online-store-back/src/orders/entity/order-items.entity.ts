import { GoodsEntity } from 'src/goods/entity/goods.entity';
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

@Entity()
export class OrderItemsEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ManyToOne(() => OrdersEntity, { onDelete: 'CASCADE' })
  order?: OrdersEntity;

  @Column({
    nullable: false,
  })
  goodsId?: string;

  @ManyToOne(type => GoodsEntity, {
    eager: true,
    cascade: false,
    nullable: false,
  })
  @JoinColumn()
  goods?: GoodsEntity;

  @Column({ nullable: true, default: 1 })
  count: number;

  @Column({ type: 'boolean', nullable: false, default: false })
  isCanceled?: boolean;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false, default: '' })
  currency?: string;

  @CreateDateColumn()
  createdOn?: Date;

  @UpdateDateColumn()
  updatedOn?: Date;
}
