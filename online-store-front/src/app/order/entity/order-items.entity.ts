import { GoodsEntity } from '../../goods/goods.entity';
import { OrdersEntity } from './orders.entity';

export class OrderItemsEntity {
  id?: string;

  order?: OrdersEntity;

  goodsId?: string;

  goods?: GoodsEntity;

  count: number;

  isCanceled?: boolean;

  price: number;

  currency?: string;

  createdOn?: Date;

  updatedOn?: Date;
}
