import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShareModule } from './../share.module';
import { ArticleHeaderCardComponent } from './article-header-card/article-header-card.component';
import { ArticleViewComponent } from './article-view/article-view.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';

@NgModule({
  declarations: [
    ArticlesListComponent,
    ArticleHeaderCardComponent,
    ArticleViewComponent,
  ],
  imports: [CommonModule, ShareModule],
  exports: [ArticlesListComponent],
})
export class ArticlesModule {}
