import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShareModule } from './../share.module';
import { OrderItemSetWidgetComponent } from './order-item-set-widget/order-item-set-widget.component';
import { OrderViewerComponent } from './order-viewer/order-viewer.component';

@NgModule({
  declarations: [OrderViewerComponent, OrderItemSetWidgetComponent],
  exports: [OrderViewerComponent, OrderItemSetWidgetComponent],
  imports: [CommonModule, ShareModule],
})
export class OrderModule {}
