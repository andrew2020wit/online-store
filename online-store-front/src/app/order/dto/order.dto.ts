export class OrderDto {
  header: OrderHeader;
  body: Array<OrderItem>;
}

export class OrderHeader {
  id?: string;
  userId: string;
  deliverAddress: string;
  userNote: string;
  status: string;

  isCanceled?: boolean;
  isPaid?: boolean;
  isDispatched?: boolean;
  isDelivered?: boolean;

  createdOn?: Date;
  updatedOn?: Date;
}
export class OrderItem {
  id?: string;
  orderId?: string;

  goodsId: string;
  count: number;

  isCanceled?: boolean;
  price?: number;
  createdOn?: Date;
  updatedOn?: Date;
}
