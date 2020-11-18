import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArticlesModule } from './../articles/articles.module';
import { GoodsModule } from './../goods/goods.module';
import { ShareModule } from './../share.module';
import { AboutComponent } from './pages/about/about.component';
import { GoodsComponent } from './pages/goods/goods.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NewsComponent } from './pages/news/news.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';

@NgModule({
  declarations: [
    HomePageComponent,
    NotFoundPageComponent,
    AboutComponent,
    NewsComponent,
    ReviewsComponent,
    GoodsComponent,
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
