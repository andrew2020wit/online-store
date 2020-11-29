import { OrderItemsEntity } from './order-items.entity';

export class OrdersEntity {
  id?: string;

  userId?: string;

  items?: OrderItemsEntity[];

  isCanceled?: boolean;

  isPaid?: boolean;

  isDispatched?: boolean;

  isDelivered?: boolean;

  status?: string;

  deliverAddress: string;

  userNote?: string;

  createdOn?: Date;

  updatedOn?: Date;
}
