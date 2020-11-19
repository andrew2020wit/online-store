import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from './app-common/general.service';
import { AuthService } from './auth-module/auth.service';
import { menuList } from './site-menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  links = menuList;
  isLoading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private generalService: GeneralService
  ) {
    this.authService.loadLocalToken();
    this.generalService.isLoading$.subscribe((x) => (this.isLoading = x));
    this.generalService.errorMessage$.subscribe((x) => (this.errorMessage = x));
  }
  ngOnInit(): void {}

  toHome() {
    this.router.navigate(['']);
    setTimeout(() => document.location.reload(), 0);
  }
  hideErrorMessage() {
    this.generalService.errorMessage$.next('');
  }
}
