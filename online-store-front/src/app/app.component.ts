import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GeneralService } from './app-common/general.service';
import { AuthService } from './auth-module/auth.service';
import { OrderService } from './order/order.service';
import { menuList } from './site-menu';
import { CustomSnackBarComponent } from './view/custom-snack-bar/custom-snack-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  links = menuList;
  isLoading = false;
  errorMessage = '';
  cartIsOpen = false;
  itemCount = 0;
  orderSum = 0;
  userNameForWelcome = '';

  private intersectionObserver: IntersectionObserver;

  constructor(
    private authService: AuthService,
    private router: Router,
    private generalService: GeneralService,
    private orderService: OrderService,
    private _snackBar: MatSnackBar
  ) {
    this.authService.loadLocalToken();
    this.generalService.isLoading$.subscribe((x) => (this.isLoading = x));
    this.generalService.errorMessage$.subscribe((x) => (this.errorMessage = x));
    this.orderService.cartIsOpen$.subscribe((x) => {
      this.cartIsOpen = x;
    });
    this.orderService.orderItemsMap$.subscribe((map) => {
      const { itemCount, orderSum } = this.orderService.computeOrderResults(
        map
      );
      this.itemCount = itemCount;
      this.orderSum = orderSum;
    });
    this.generalService.snackBarMessages.subscribe((message) => {
      if (message) {
        this._snackBar.openFromComponent(CustomSnackBarComponent, {
          data: message,
          duration: 1000,
        });
      }
    });

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        this.generalService.isFooterIntersected$.next(
          entries[0].isIntersecting
        );
      },
      { rootMargin: '0px 0px 1000px 0px' }
    );
  }
  ngOnInit(): void {
    this.authService.loginFrameOpened$.next(false);
  }

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
  switchCart() {
    this.orderService.cartIsOpen$.next(!this.cartIsOpen);
  }
}
