import { CurrentUser } from './../auth-module/dto/current-user';
export class ArticleDTO {
  id?: string;

  title: string;
  description: string;
  text: string;

  author?: CurrentUser;
  isActive?: boolean;
  createdOn?: Date;
  updatedOn?: Date;
}
