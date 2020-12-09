import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExternalShareModule } from '../share/external-share.module';
import { InternalShareModule } from '../share/internal-share.module';
import { MaterialShareModule } from '../share/material-share.module';
import { ArticlesModule } from './../articles/articles.module';
import { GoodsModule } from './../goods/goods.module';
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
    ExternalShareModule,
    RouterModule,
    ArticlesModule,
    GoodsModule,
    MaterialShareModule,
    InternalShareModule,
  ],
})
export class ViewModule {}
