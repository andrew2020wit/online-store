import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShareModule } from './../share.module';
import { ArticleHeaderCardComponent } from './article-header-card/article-header-card.component';
import { ArticleViewComponent } from './article-view/article-view.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticlesPageComponent } from './articles-page/articles-page.component';
import { EditArticleComponent } from './edit-article/edit-article.component';

const exportModules = [
  ArticlesListComponent,
  ArticleHeaderCardComponent,
  ArticleViewComponent,
  EditArticleComponent,
  ArticlesPageComponent,
];

@NgModule({
  declarations: exportModules,
  imports: [CommonModule, ShareModule],
  exports: exportModules,
})
export class ArticlesModule {}
