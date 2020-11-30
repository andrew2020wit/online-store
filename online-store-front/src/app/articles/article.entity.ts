import { UserEntity } from '../auth-module/user.entity';

export class ArticleEntity {
  id?: string;
  title?: string;
  description?: string;
  text?: string;
  isActive?: boolean;
  author?: UserEntity;
  createdOn?: Date;
  updatedOn?: Date;
}
