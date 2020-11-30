import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleEntity } from './../article.entity';
import { ArticlesService } from './../articles.service';

@Component({
  selector: 'app-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.scss'],
})
export class ArticleViewComponent {
  routerId: string;
  entity: ArticleEntity;

  constructor(
    private entityService: ArticlesService,
    private activateRoute: ActivatedRoute
  ) {
    this.routerId = this.activateRoute.snapshot.params['id'];
    this.getEntity();
  }
  getEntity() {
    this.entityService.getById(this.routerId).subscribe((entity) => {
      this.entity = entity;
    });
  }
}
