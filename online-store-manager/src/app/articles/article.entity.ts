import { UserEntity } from '../auth-module/user.entity';

export type articleTypes = 'article' | 'news' | 'review';

export class ArticleEntity {
  id?: string;
  title?: string;
  articleType?: articleTypes;
  description?: string;
  text?: string;
  isActive?: boolean;
  author?: UserEntity;
  createdOn?: Date;
  updatedOn?: Date;
}
