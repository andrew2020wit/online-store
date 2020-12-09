import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExternalShareModule } from '../share/external-share.module';
import { InternalShareModule } from '../share/internal-share.module';
import { MaterialShareModule } from '../share/material-share.module';
import { OrderCartComponent } from './order-cart/order-cart.component';
import { OrderItemSetWidgetComponent } from './order-item-set-widget/order-item-set-widget.component';
import { OrdersListComponent } from './orders-list/orders-list.component';

const exportModules = [
  OrderCartComponent,
  OrderItemSetWidgetComponent,
  OrdersListComponent,
];
@NgModule({
  declarations: [...exportModules],
  exports: [...exportModules],
  imports: [
    CommonModule,
    InternalShareModule,
    MaterialShareModule,
    ExternalShareModule,
  ],
})
export class OrderModule {}
