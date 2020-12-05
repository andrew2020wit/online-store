import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseApiUrl } from '../../environments/environment';
import { QueryEntityDto } from '../global-interface/dto/query-entity.dto';
import { ArticleEntity } from './article.entity';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(private http: HttpClient) {}
  queryEntitys(queryDto: QueryEntityDto) {
    const endPoint = baseApiUrl + '/api/article/query-headers';
    return this.http.post<ArticleEntity[]>(endPoint, queryDto);
  }

  getById(id: string) {
    const endPoint = baseApiUrl + '/api/article/get-by-id/' + id;
    return this.http.get<ArticleEntity>(endPoint);
  }
}
