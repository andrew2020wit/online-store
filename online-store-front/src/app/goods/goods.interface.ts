export interface IGoods {
  id?: string;
  name: string;
  smallPhotoUrl?: string;
  bidPhotoUrl?: string;
  price?: number;
  description?: string;
  isActive?: boolean;
  createdOn?: Date;
  updatedOn?: Date;
}
