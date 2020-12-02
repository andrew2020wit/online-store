import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiProperty()
  @ManyToOne(() => OrdersEntity, { onDelete: 'CASCADE' })
  order?: OrdersEntity;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  goodsId?: string;

  @ApiProperty()
  @ManyToOne(type => GoodsEntity, {
    eager: true,
    cascade: false,
    nullable: false,
  })
  @JoinColumn()
  goods?: GoodsEntity;

  @ApiProperty()
  @Column({ nullable: true, default: 1 })
  count: number;

  @ApiProperty()
  @Column({ type: 'boolean', nullable: false, default: false })
  isCanceled?: boolean;

  @ApiProperty()
  @Column({ nullable: false })
  price: number;

  @ApiProperty()
  @Column({ nullable: false, default: '' })
  currency?: string;

  @ApiProperty()
  @CreateDateColumn()
  createdOn?: Date;

  @ApiProperty() s;
  @UpdateDateColumn()
  updatedOn?: Date;
}
