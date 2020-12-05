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

  queryEntitys(takeN: number, dateAfter: Date, pattern: string) {
    const endPoint = baseApiUrl + '/api/goods/query';
    const query: QueryDto = {
      maxItemCount: takeN,
      createdOnLessThan: dateAfter,
      pattern: pattern,
    };
    return this.http.post<GoodsEntity[]>(endPoint, query);
  }

  getById(id: string) {
    const endPoint = baseApiUrl + '/api/goods/get-by-id/' + id;
    return this.http.get<GoodsEntity>(endPoint);
  }
}
