import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExternalShareModule } from '../share/external-share.module';
import { InternalShareModule } from '../share/internal-share.module';
import { MaterialShareModule } from '../share/material-share.module';
import { OrderModule } from './../order/order.module';
import { GoodsCardComponent } from './goods-card/goods-card.component';
import { GoodsListComponent } from './goods-list/goods-list.component';
import { GoodsPageComponent } from './goods-page/goods-page.component';
import { GoodsViewComponent } from './goods-view/goods-view.component';
import { PriceSpanComponent } from './price-span/price-span.component';

const exportModules = [
  GoodsListComponent,
  GoodsPageComponent,
  GoodsViewComponent,
  PriceSpanComponent,
  GoodsCardComponent,
];

@NgModule({
  declarations: [...exportModules],
  exports: exportModules,
  imports: [
    CommonModule,
    MaterialShareModule,
    ExternalShareModule,
    InternalShareModule,
    OrderModule,
  ],
})
export class GoodsModule {}
