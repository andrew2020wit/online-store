import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UploadModule } from './../app-common/upload/upload.module';
import { ShareModule } from './../share.module';
import { GoodsCardComponent } from './goods-card/goods-card.component';
import { GoodsEditComponent } from './goods-edit/goods-edit.component';
import { GoodsListComponent } from './goods-list/goods-list.component';
import { GoodsViewComponent } from './goods-view/goods-view.component';

@NgModule({
  declarations: [
    GoodsListComponent,
    GoodsCardComponent,
    GoodsViewComponent,
    GoodsEditComponent,
  ],
  exports: [GoodsListComponent, GoodsCardComponent],
  imports: [CommonModule, ShareModule, UploadModule],
})
export class GoodsModule {}
