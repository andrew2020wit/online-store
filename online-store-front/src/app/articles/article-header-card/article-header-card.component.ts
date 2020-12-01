import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleEntity } from './../article.entity';

@Component({
  selector: 'app-article-header-card',
  templateUrl: './article-header-card.component.html',
  styleUrls: ['./article-header-card.component.scss'],
})
export class ArticleHeaderCardComponent implements OnInit {
  @Input() entity: ArticleEntity;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  go() {
    this.router.navigate(['/article-view', this.entity.id]);
  }
}
