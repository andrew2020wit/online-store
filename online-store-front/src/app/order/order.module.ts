import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShareModule } from './../share.module';
import { OrderCartComponent } from './order-cart/order-cart.component';
import { OrderItemSetWidgetComponent } from './order-item-set-widget/order-item-set-widget.component';
import { OrdersListComponent } from './orders-list/orders-list.component';

@NgModule({
  declarations: [
    OrderCartComponent,
    OrderItemSetWidgetComponent,
    OrdersListComponent,
  ],
  exports: [
    OrderCartComponent,
    OrderItemSetWidgetComponent,
    OrdersListComponent,
  ],
  imports: [CommonModule, ShareModule],
})
export class OrderModule {}
