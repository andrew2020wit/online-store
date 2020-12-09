import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExternalShareModule } from '../share/external-share.module';
import { InternalShareModule } from '../share/internal-share.module';
import { MaterialShareModule } from '../share/material-share.module';
import { ArticleHeaderCardComponent } from './article-header-card/article-header-card.component';
import { ArticleViewComponent } from './article-view/article-view.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { ReviewsPageComponent } from './reviews-page/reviews-page.component';

const exportModules = [
  NewsPageComponent,
  ReviewsPageComponent,
  ArticlesListComponent,
];

@NgModule({
  declarations: [
    ArticleHeaderCardComponent,
    ArticleViewComponent,
    ...exportModules,
  ],
  imports: [
    CommonModule,
    ExternalShareModule,
    InternalShareModule,
    MaterialShareModule,
  ],
  exports: [...exportModules],
})
export class ArticlesModule {}
