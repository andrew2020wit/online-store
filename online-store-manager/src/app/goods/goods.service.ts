import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QueryDto } from '../global-interface/dto/query.dto';
import { baseApiUrl } from './../../environments/environment';
import { AuthService } from './../auth-module/auth.service';
import { StatusMessageDto } from './../global-interface/dto/status-message.dto';
import { GoodsEntity } from './goods.entity';

@Injectable({
  providedIn: 'root',
})
export class GoodsService {
  constructor(private http: HttpClient, private authService: AuthService) {}

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

  create$(entity: GoodsEntity) {
    const endPoint = baseApiUrl + '/api/goods';
    const userId = this.authService.appUser.id;
    if (!userId) {
      console.log('this.authService.appUser.sub false');
      return;
    }
    return this.http.put<StatusMessageDto>(endPoint, entity);
  }

  edit$(entity: GoodsEntity) {
    const endPoint = baseApiUrl + '/api/goods';
    const userId = this.authService.appUser.id;
    if (!userId) {
      console.log('this.authService.appUser.sub false');
      return;
    }
    return this.http.post<StatusMessageDto>(endPoint, entity);
  }

  activate$(articleId: string, status: boolean) {
    const endPoint = baseApiUrl + '/api/goods';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: articleId,
        status: status,
      },
    };

    const userId = this.authService.appUser.id;
    if (!userId) {
      console.log('this.authService.appUser.sub false');
      return;
    }
    return this.http.delete<StatusMessageDto>(endPoint, httpOptions);
  }
}
