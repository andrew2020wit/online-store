import { Component, OnInit } from '@angular/core';
import { OrdersEntity } from './../entity/orders.entity';
import { OrderService } from './../order.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
})
export class OrdersListComponent implements OnInit {
  orders: OrdersEntity[] = [];

  takeV = 40;
  createOnCursor: Date = new Date();

  constructor(private orderService: OrderService) {
    this.getOrders();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  ngOnDestroy() {}

  getOrders() {
    this.orderService.getOrders(40, this.createOnCursor).subscribe((orders) => {
      this.orders = orders;
      console.log('orders', orders);
    });
  }
}
