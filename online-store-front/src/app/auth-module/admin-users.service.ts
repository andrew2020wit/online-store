import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseApiUrl } from '../../environments/environment';
import { UserAdminView } from './dto/user-admin-view.dto';

// export interface IUsersListElement {}

@Injectable({
  providedIn: 'root',
})
export class AdminUsersService {
  constructor(private http: HttpClient) {}
  getUsersList(pattern: string): Observable<UserAdminView[]> {
    return this.http.get<UserAdminView[]>(
      baseApiUrl + `/api/admin/users?pattern=${pattern}`
    );
  }

  getUserById(userId: string): Observable<UserAdminView> {
    return this.http.get<UserAdminView>(
      baseApiUrl + `/api/admin/user?userId=${userId}`
    );
  }

  changeUser(
    userId: string,
    property: string,
    value: string
  ): Observable<UserAdminView> {
    return this.http.get<UserAdminView>(
      baseApiUrl +
        `/api/admin/change-user?userId=${userId}&property=${property}&value=${value}`
    );
  }
}
