import { UserEntity } from '../auth-module/user.entity';

export const articleTypes = {
  article: 'article',
  news: 'news',
  review: 'review',
};

export class ArticleEntity {
  id?: string;
  title?: string;
  articleType?: string;
  description?: string;
  text?: string;
  isActive?: boolean;
  author?: UserEntity;
  createdOn?: Date;
  updatedOn?: Date;
}
