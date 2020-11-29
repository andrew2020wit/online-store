import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShareModule } from './../share.module';
import { OrderCartComponent } from './order-cart/order-cart.component';
import { OrderItemSetWidgetComponent } from './order-item-set-widget/order-item-set-widget.component';

@NgModule({
  declarations: [OrderCartComponent, OrderItemSetWidgetComponent],
  exports: [OrderCartComponent, OrderItemSetWidgetComponent],
  imports: [CommonModule, ShareModule],
})
export class OrderModule {}
