import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { baseApiUrl } from '../../environments/environment';
import { StatusMessageDto } from '../global-interface/dto/status-message.dto';
import { GeneralService } from './../app-common/general.service';
import { LoginDto } from './dto/login.dto';
import { JWTokenDTO } from './dto/token-object.dto';
import { UserEntity } from './user.entity';

const jwtHelperService = new JwtHelperService();
const keyLocalStorToken = 'keyLocalStorToken';
const keyLocalStorSayWelcome = 'keyLocalStorSayWelcome';

export interface IToken {
  login: string;
  sub: string;
  role: string;
  fullName: string;
  iat: number;
  exp: number;
}

export interface IUser {
  id: string;
  login: string;
  role: string;
  fullName: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _appUser$ = new BehaviorSubject<IUser | null>(null);

  appUser$ = this._appUser$.asObservable();

  appUser: IUser = null;

  tokenStr = '';
  private _tokenObj: IToken = null;

  setTimeoutOfTokenUpdate: ReturnType<typeof setTimeout>;

  loginFrameOpened$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    private generalService: GeneralService
  ) {
    this.appUser$.subscribe((user) => {
      if (user) {
        this.loginFrameOpened$.next(false);
      } else {
        this.loginFrameOpened$.next(true);
      }
    });
  }

  loadLocalToken() {
    const access_token = localStorage.getItem(keyLocalStorToken);
    if (!access_token) {
      this._appUser$.next(null);
      this.tokenStr = '';
    } else {
      this.tokenStr = access_token;
      const tokenObj: IToken = jwtHelperService.decodeToken(access_token);
      this._tokenObj = tokenObj;
      console.log('new tokenObj:', tokenObj);

      const newUser: IUser = {
        fullName: tokenObj.fullName,
        role: tokenObj.role,
        id: tokenObj.sub,
        login: tokenObj.login,
      };

      this._appUser$.next(newUser);
      this.appUser = newUser;

      this.checkExpOfToken();

      clearTimeout(this.setTimeoutOfTokenUpdate);

      this.setTimeoutOfTokenUpdate = setTimeout(() => {
        this.getUpdateToken();
      }, 3600000);
      this.sendWelcome();
    }
  }

  createUser$(newUser: UserEntity) {
    return this.http.post<StatusMessageDto>(
      baseApiUrl + '/api/user/create-user',
      newUser
    );
  }

  editUser$(entity: UserEntity) {
    return this.http.post<StatusMessageDto>(
      baseApiUrl + '/api/user/edit-user',
      entity
    );
  }

  getUserEntity$(id: string) {
    const endPoint = baseApiUrl + '/api/user/get-user-entity/' + id;

    return this.http.get<UserEntity>(endPoint);
  }

  sendWelcome() {
    const say = localStorage.getItem(keyLocalStorSayWelcome);
    if (!say) {
      return;
    }
    if (this.appUser && this.appUser.fullName) {
      this.generalService.snackBarMessages.next(
        `Welcome, ${this.appUser.fullName}!`
      );
      localStorage.removeItem(keyLocalStorSayWelcome);
    }
  }

  async getToken(user: LoginDto) {
    this.http
      .post<JWTokenDTO>(baseApiUrl + '/api/auth/get-token-obj', user)
      .subscribe((tokenObj) => {
        localStorage.setItem(keyLocalStorToken, tokenObj.access_token);
        this.loadLocalToken();
        localStorage.setItem(keyLocalStorSayWelcome, 'yes');
        this.router.navigate(['']);
        setTimeout(() => location.reload());
      });
  }

  async getUpdateToken() {
    if (!this.checkExpOfToken()) {
      return;
    }
    this.http
      .get<JWTokenDTO>(baseApiUrl + '/api/auth/update-token')
      .subscribe((tokenObj) => {
        console.log('start update token ');

        localStorage.setItem(keyLocalStorToken, tokenObj.access_token);
        this.loadLocalToken();
      });
  }

  async logout() {
    localStorage.removeItem(keyLocalStorToken);
    this._appUser$.next(null);
    this._tokenObj = null;
    this.tokenStr = '';
    clearTimeout(this.setTimeoutOfTokenUpdate);
    this.router.navigate(['']);
    setTimeout(() => location.reload());
  }

  checkExpOfToken(): boolean {
    if (!this._tokenObj) {
      return false;
    }

    const exp = 1000 * this._tokenObj.exp;
    const curTime: number = new Date().getTime();

    if (exp < curTime) {
      console.error('token too old, logout');
      this.logout();
      return false;
    }

    return true;
  }
}
