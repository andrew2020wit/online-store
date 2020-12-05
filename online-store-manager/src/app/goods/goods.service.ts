import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QueryEntityDto } from '../global-interface/dto/query-entity.dto';
import { baseApiUrl } from './../../environments/environment';
import { AuthService } from './../auth-module/auth.service';
import { StatusMessageDto } from './../global-interface/dto/status-message.dto';
import { GoodsEntity } from './goods.entity';

@Injectable({
  providedIn: 'root',
})
export class GoodsService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  queryEntitys(takeN: number, dateAfter: Date, pattern: string) {
    const endPoint = baseApiUrl + '/api/goods/query';
    const query: QueryEntityDto = {
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

  createOrEdit$(entity: GoodsEntity) {
    const endPoint = baseApiUrl + '/api/goods/create-or-update';
    return this.http.post<StatusMessageDto>(endPoint, entity);
  }
}
