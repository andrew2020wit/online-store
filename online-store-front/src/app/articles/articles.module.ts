import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShareModule } from './../share.module';
import { ArticleHeaderCardComponent } from './article-header-card/article-header-card.component';
import { ArticleViewComponent } from './article-view/article-view.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { ReviewsPageComponent } from './reviews-page/reviews-page.component';

@NgModule({
  declarations: [
    ArticlesListComponent,
    ArticleHeaderCardComponent,
    ArticleViewComponent,
    NewsPageComponent,
    ReviewsPageComponent,
  ],
  imports: [CommonModule, ShareModule],
  exports: [NewsPageComponent, ReviewsPageComponent, ArticlesListComponent],
})
export class ArticlesModule {}
