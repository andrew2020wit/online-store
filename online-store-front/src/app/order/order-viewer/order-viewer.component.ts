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
}
