import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {
    this.routerId = this.activateRoute.snapshot.params['id'];
    this.getEntity();
  }
  getEntity() {
    this.entityService.getById(this.routerId).subscribe((entity) => {
      this.entity = entity;
    });
  }
  goToEdit() {
    this.router.navigate([`/edit-article/${this.routerId}`]);
  }
}
