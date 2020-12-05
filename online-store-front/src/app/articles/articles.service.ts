import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseApiUrl } from '../../environments/environment';
import { QueryDto } from '../global-interface/dto/query.dto';
import { ArticleEntity } from './article.entity';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(private http: HttpClient) {}

  queryEntitys(takeN: number, dateAfter: Date, pattern: string) {
    const endPoint = baseApiUrl + '/api/article/query-headers';
    const query: QueryDto = {
      maxItemCount: takeN,
      createdOnLessThan: dateAfter,
      pattern: pattern,
    };
    return this.http.post<ArticleEntity[]>(endPoint, query);
  }

  getById(id: string) {
    const endPoint = baseApiUrl + '/api/article/' + id;
    return this.http.get<ArticleEntity>(endPoint);
  }
}
