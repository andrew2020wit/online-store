import { Component, Input, OnInit } from '@angular/core';
import { IGoods } from './../../goods/goods.interface';
import { OrderItem } from './../dto/order.dto';
import { OrderService } from './../order.service';

@Component({
  selector: 'app-order-item-set-widget',
  templateUrl: './order-item-set-widget.component.html',
  styleUrls: ['./order-item-set-widget.component.scss'],
})
export class OrderItemSetWidgetComponent implements OnInit {
  count = 0;

  @Input() goods: IGoods;

  constructor(private orderService: OrderService) {}

  changeCount(x) {
    this.count = this.count + x;
    this.updateOrderState();
  }

  setCount(x) {
    this.count = x;
    this.updateOrderState();
  }

  updateOrderState() {
    const orderItem: OrderItem = {
      name: this.goods.name,
      count: this.count,
      goodsId: this.goods.id,
      price: this.goods.price,
    };
    this.orderService.setOrderItem(orderItem);
  }

  ngOnInit(): void {}
}
