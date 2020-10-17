import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { baseApiUrl } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';
import { StatusMessageDto } from './../dto/status-message.dto';
import { AdminUsersService } from './admin-users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JWTokenDTO } from './dto/token-object.dto';

const jwtHelperService = new JwtHelperService();
const keyLocalStorToken = 'keyLocalStorToken';

export interface IToken {
  login: string;
  sub: string;
  role: string;
  fullName: string;
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _appUser$ = new BehaviorSubject<IToken | null>(null);
  appUser$ = this._appUser$.asObservable();
  currentToken = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private adminUsersService: AdminUsersService
  ) {}

  get appUser(): IToken | null {
    return this._appUser$.getValue();
  }

  get appUserRole(): string | null {
    const user: IToken = this._appUser$.getValue();
    if (!!user) {
      return user.role;
    }
    return null;
  }

  loadLocalToken() {
    const access_token = localStorage.getItem(keyLocalStorToken);
    if (!access_token) {
      this._appUser$.next(null);
      this.currentToken = '';
    } else {
      this.currentToken = access_token;
      const tokenObj: IToken = jwtHelperService.decodeToken(access_token);
      this._appUser$.next(tokenObj);
      this.checkExpOfToken();
    }
  }

  createUser$(newUser: CreateUserDto) {
    return this.http.post<StatusMessageDto>(
      baseApiUrl + '/api/auth/create-user',
      newUser
    );
  }

  editUser$(editUser: CreateUserDto) {
    return this.http.post<StatusMessageDto>(
      baseApiUrl + '/api/auth/edit-user',
      editUser
    );
  }

  async getToken(user: LoginDto) {
    this.http
      .post<JWTokenDTO>(baseApiUrl + '/api/auth/get-token-obj', user)
      .subscribe((tokenObj) => {
        localStorage.setItem(keyLocalStorToken, tokenObj.access_token);
        this.loadLocalToken();
      });
  }

  async logout() {
    this.router.navigate(['']);
    localStorage.removeItem(keyLocalStorToken);
    this._appUser$.next(null);
    this.adminUsersService.reset();
  }

  checkExpOfToken(): boolean {
    if (!this.appUser) {
      return false;
    }

    const exp = 1000 * this.appUser.exp;
    const curTime: number = new Date().getTime();

    if (exp < curTime) {
      console.log('token too old, logout');
      this.logout();
      return false;
    }

    return true;
  }
}
