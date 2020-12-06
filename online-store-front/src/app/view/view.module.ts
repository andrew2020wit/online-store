import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArticlesModule } from './../articles/articles.module';
import { GoodsModule } from './../goods/goods.module';
import { ShareModule } from './../share.module';
import { CustomSnackBarComponent } from './custom-snack-bar/custom-snack-bar.component';
import { AboutComponent } from './pages/about/about.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

@NgModule({
  declarations: [
    HomePageComponent,
    NotFoundPageComponent,
    AboutComponent,
    CustomSnackBarComponent,
  ],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule,
    ArticlesModule,
    GoodsModule,
  ],
})
export class ViewModule {}
