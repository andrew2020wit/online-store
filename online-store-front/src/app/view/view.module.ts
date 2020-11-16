import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArticlesModule } from './../articles/articles.module';
import { ShareModule } from './../share.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AboutComponent } from './pages/about/about.component';
import { NewsComponent } from './pages/news/news.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { GoodsComponent } from './pages/goods/goods.component';

@NgModule({
  declarations: [HomePageComponent, NotFoundPageComponent, AboutComponent, NewsComponent, ReviewsComponent, GoodsComponent],
  imports: [CommonModule, ShareModule, RouterModule, ArticlesModule],
})
export class ViewModule {}
