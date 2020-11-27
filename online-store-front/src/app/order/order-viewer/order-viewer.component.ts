import { Component, OnInit } from '@angular/core';
import { OrderItem } from './../dto/order.dto';
import { OrderService } from './../order.service';

@Component({
  selector: 'app-order-viewer',
  templateUrl: './order-viewer.component.html',
  styleUrls: ['./order-viewer.component.scss'],
})
export class OrderViewerComponent implements OnInit {
  orderItems: OrderItem[] = [];

  constructor(private orderService: OrderService) {
    this.orderService.orderItemsMap$.subscribe((map) => {
      const orderItems1: OrderItem[] = [];
      map.forEach((value) => {
        orderItems1.push(value);
      });
      this.orderItems = orderItems1;
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
}
