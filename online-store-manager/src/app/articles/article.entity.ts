import { UserEntity } from '../auth-module/user.entity';

export enum ArticleTypes {
  article = 'article',
  news = 'news',
  review = 'review',
}

export class ArticleEntity {
  id?: string;
  title?: string;
  articleType?: ArticleTypes;
  description?: string;
  text?: string;
  isActive?: boolean;
  author?: UserEntity;
  createdOn?: Date;
  updatedOn?: Date;
}
