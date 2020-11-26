export class OrderDto {
  header: {
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
  };
  body: Array<OrderItemDto>;
}

export class OrderItemDto {
  id?: string;
  orderId?: string;

  goodsId: string;
  count: number;

  isCanceled?: boolean;
  price?: number;
  createdOn?: Date;
  updatedOn?: Date;
}
