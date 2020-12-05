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
    const endPoint = baseApiUrl + '/api/article/get-by-id/' + id;
    return this.http.get<ArticleEntity>(endPoint);
  }

  createOrEdit$(entity: ArticleEntity) {
    const endPoint = baseApiUrl + '/api/article/create-or-edit';
    return this.http.post<StatusMessageDto>(endPoint, entity);
  }
}
