import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QueryDto } from '../global-interface/dto/query.dto';
import { baseApiUrl } from './../../environments/environment';
import { GoodsEntity } from './goods.entity';

@Injectable({
  providedIn: 'root',
})
export class GoodsService {
  constructor(private http: HttpClient) {}

  getEntity(takeN: number, dateAfter: Date, pattern: string) {
    const endPoint = baseApiUrl + '/api/goods/query';
    const query: QueryDto = {
      maxItemCount: takeN,
      createdOnLessThan: dateAfter,
      pattern: pattern,
    };
    return this.http.post<GoodsEntity[]>(endPoint, query);
  }

  getById(id: string) {
    const endPoint = baseApiUrl + '/api/goods' + `?id=${id}`;
    return this.http.get<GoodsEntity>(endPoint);
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
