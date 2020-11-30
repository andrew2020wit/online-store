export class GoodsEntity {
  id?: string;
  name: string;
  smallPhotoUrl?: string;
  bigPhotoUrl?: string;
  price: number;

  description?: string;

  isActive?: boolean;

  createdOn?: Date;

  updatedOn?: Date;
}
