import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from './app-common/general.service';
import { AuthService } from './auth-module/auth.service';
import { OrderService } from './order/order.service';
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
  cartIsOpen = false;
  itemCount = 0;
  orderSum = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private generalService: GeneralService,
    private orderService: OrderService
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
  }
  ngOnInit(): void {
    this.authService.loginFrameOpened$.next(false);
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
