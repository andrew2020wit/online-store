export interface IArticleHeader {
  id: string;
  title: string;
  description: string;
  createdOn: Date;
  updatedOn: Date;
  author: { id: string; fullName: string };
}
