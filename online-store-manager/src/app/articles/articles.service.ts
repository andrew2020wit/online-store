import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseApiUrl } from '../../environments/environment';
import { QueryDto } from '../global-interface/dto/query.dto';
import { AuthService } from './../auth-module/auth.service';
import { StatusMessageDto } from './../global-interface/dto/status-message.dto';
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

  edit$(entity: ArticleEntity) {
    const endPoint = baseApiUrl + '/api/articles';
    return this.http.post<StatusMessageDto>(endPoint, entity);
  }
}
