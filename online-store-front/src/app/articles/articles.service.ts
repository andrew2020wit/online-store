import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseApiUrl } from '../../environments/environment';
import { QueryDto } from '../global-interface/dto/query.dto';
import { AuthService } from './../auth-module/auth.service';
import { ArticleEntity } from './article.entity';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getEntity(takeN: number, dateAfter: Date, pattern: string) {
    const endPoint = baseApiUrl + '/api/articles/query-header';
    const query: QueryDto = {
      maxItemCount: takeN,
      createdOnLessThan: dateAfter,
      pattern: pattern,
    };
    return this.http.post<ArticleEntity[]>(endPoint, query);
  }

  getById(id: string) {
    const endPoint = baseApiUrl + '/api/articles' + `?id=${id}`;
    return this.http.get<ArticleEntity>(endPoint);
  }

  create$(title: string, description: string, text: string) {
    // const userId = this.authService.appUser.id;
    // if (!userId) {
    //   console.log('this.authService.appUser.sub false');
    //   return;
    // }
    return this.http.put;
  }

  edit$(articleId: string, title: string, description: string, text: string) {
    // const userId = this.authService.appUser.id;
    // if (!userId) {
    //   console.log('this.authService.appUser.id false');
    //   return;
    // }
    // return this.apollo.mutate({
    //   mutation: this.EditArticlesGQL,
    //   variables: { articleId, description, text, title },
    // });
  }

  delete$(articleId: string) {
    // const userId = this.authService.appUser.id;
    // if (!userId) {
    //   console.log('this.authService.appUser.id false');
    //   return;
    // }
    // return this.apollo.mutate({
    //   mutation: this.DisActiveArticleGQL,
    //   variables: { articleId },
    // });
  }
}
