import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseApiUrl } from 'environments/environment';
import { Observable } from 'rxjs';
import { UserAdminView } from './dto/user-admin-view.dto';

export interface IUsersListElement {}

@Injectable({
  providedIn: 'root',
})
export class AdminUsersService {
  constructor(private http: HttpClient) {}

  // activateUser(userId: string, isActive: boolean) {
  //   this.http
  //     .post(baseApiUrl + '/api/auth/admin/activate-user', {
  //       userId,
  //       isActive,
  //     })
  //     .subscribe((x) => {
  //       this.httpLoadUsers();
  //     });
  // }

  getUsersList(pattern: string): Observable<UserAdminView[]> {
    return this.http.get<UserAdminView[]>(
      baseApiUrl + `/api/admin/users?pattern=${pattern}`
    );
  }
}
