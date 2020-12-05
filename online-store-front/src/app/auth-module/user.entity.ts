export class UserEntity {
  id?: string;
  login?: string;
  fullName?: string;
  password?: string;
  role?: string;
  defaultDeliverAddress?: string;
  isActive?: boolean;
  createdOn?: Date;
  updatedOn?: Date;
}
