import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { AuthService } from './../auth-module/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  CreateArticlesGQL = gql`
    mutation createArticle(
      $description: String!
      $text: String!
      $title: String!
    ) {
      createArticle(description: $description, text: $text, title: $title)
    }
  `;
  EditArticlesGQL = gql`
    mutation editArticle(
      $articleId: String!
      $description: String!
      $text: String!
      $title: String!
    ) {
      editArticle(
        articleId: $articleId
        description: $description
        text: $text
        title: $title
      )
    }
  `;

  DisActiveArticleGQL = gql`
    mutation disActiveArticle($articleId: String!) {
      disActiveArticle(articleId: $articleId)
    }
  `;

  constructor(private apollo: Apollo, private authService: AuthService) {}

  createArticle$(title: string, description: string, text: string) {
    const userId = this.authService.appUser.sub;
    if (!userId) {
      console.log('this.authService.appUser.sub false');
      return;
    }
    return this.apollo.mutate({
      mutation: this.CreateArticlesGQL,
      variables: {
        description,
        text,
        title,
      },
    });
  }

  editArticle$(
    articleId: string,
    title: string,
    description: string,
    text: string
  ) {
    const userId = this.authService.appUser.sub;
    if (!userId) {
      console.log('this.authService.appUser.sub false');
      return;
    }

    return this.apollo.mutate({
      mutation: this.EditArticlesGQL,
      variables: { articleId, description, text, title },
    });
  }

  disActiveArticle$(articleId: string) {
    const userId = this.authService.appUser.sub;
    if (!userId) {
      console.log('this.authService.appUser.sub false');
      return;
    }

    return this.apollo.mutate({
      mutation: this.DisActiveArticleGQL,
      variables: { articleId },
    });
  }
}
