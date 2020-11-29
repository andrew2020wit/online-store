import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth-module/auth.service';
import { OrderItem } from '../dto/order.dto';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-cart',
  templateUrl: './order-cart.component.html',
  styleUrls: ['./order-cart.component.scss'],
})
export class OrderCartComponent implements OnInit {
  orderItems: OrderItem[] = [];
  itemCount = 0;
  orderSum = 0;
  cartIsOpen = false;
  deliverAddress = '';
  userNote = '';

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {
    this.orderService.orderItemsMap$.subscribe((map) => {
      const orderItems1: OrderItem[] = [];
      map.forEach((value) => {
        orderItems1.push(value);
      });
      this.orderItems = orderItems1;
      const { itemCount, orderSum } = this.orderService.computeOrderResults(
        map
      );
      this.itemCount = itemCount;
      this.orderSum = orderSum;
    });
    this.orderService.cartIsOpen$.subscribe((x) => {
      this.cartIsOpen = x;
    });
  }

  ngOnInit(): void {}

  clearCart() {
    this.orderService.setDefaultState();
  }

  incrementOrderItem(orderItem: OrderItem) {
    orderItem.count = orderItem.count + 1;
    this.orderService.setOrderItem(orderItem);
  }
  decrementOrderItem(orderItem: OrderItem) {
    if (orderItem.count < 1) {
      return;
    }
    orderItem.count = orderItem.count - 1;
    this.orderService.setOrderItem(orderItem);
  }
  removeOrderItem(orderItem: OrderItem) {
    orderItem.count = -1;
    this.orderService.setOrderItem(orderItem);
  }
  hideCart() {
    this.orderService.cartIsOpen$.next(false);
  }

  sendOrder() {
    const addr = this.deliverAddress;
    const items = this.orderItems;
    const userNote = this.userNote;
    const user = this.authService.appUser;
    if (!user) {
      alert('You must be logged!');
      this.authService.loginFrameOpened$.next(true);
      return;
    }
    if (addr == '') {
      alert('DeliverAddress must be not empty!');
      return;
    }
    if (!confirm(`Are you really wont to send order to ${addr}?`)) {
      return;
    }
    const order = this.orderService.buildOrder(items, addr, userNote, user);

    this.orderService.sendOrder(order).subscribe((x) => {
      console.log('orderService.sendOrder', x);
    });
  }
}
