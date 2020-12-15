import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from './app-common/general.service';
import { AuthService } from './auth-module/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  isLoading = false;
  errorMessage = '';
  private intersectionObserver: IntersectionObserver;

  constructor(
    private authService: AuthService,
    private router: Router,
    private generalService: GeneralService
  ) {
    this.authService.loadLocalToken();
    this.generalService.isLoading$.subscribe((x) => (this.isLoading = x));
    this.generalService.errorMessage$.subscribe((x) => (this.errorMessage = x));

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        this.generalService.isFooterIntersected$.next(
          entries[0].isIntersecting
        );
      },
      { rootMargin: '0px 0px 1000px 0px' }
    );
  }
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.intersectionObserver.observe(document.getElementById('footerId'));
  }

  ngOnDestroy() {
    this.intersectionObserver.disconnect();
  }

  toHome() {
    this.router.navigate(['']);
    setTimeout(() => document.location.reload(), 0);
  }
  hideErrorMessage() {
    this.generalService.errorMessage$.next('');
  }
}
