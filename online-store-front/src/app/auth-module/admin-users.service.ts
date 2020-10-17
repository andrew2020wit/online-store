import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseApiUrl } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';
import { UserAdminView } from './dto/user-admin-view.dto';

@Injectable({
  providedIn: 'root',
})
export class AdminUsersService {
  private _users$ = new BehaviorSubject<UserAdminView[]>([]);
  private _usersLoading$ = new BehaviorSubject<boolean>(false);
  public users$ = this._users$.asObservable();
  public usersLoading$ = this._usersLoading$.asObservable();
  constructor(private http: HttpClient) {}
  httpLoadUsers() {
    this.http
      .get<UserAdminView[]>(baseApiUrl + '/api/auth/admin/users')
      .subscribe((users) => {
        this._users$.next(users);
      });
  }
  activateUser(userId: string, isActive: boolean) {
    this.http
      .post(baseApiUrl + '/api/auth/admin/activate-user', {
        userId,
        isActive,
      })
      .subscribe((x) => {
        this.httpLoadUsers();
      });
  }
  reset() {
    this._users$.next([]);
  }
}
