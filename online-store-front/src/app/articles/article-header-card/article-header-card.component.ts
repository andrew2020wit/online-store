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

  shortTitle = '';
  maxTitleLength = 20;

  shortDescription = '';
  maxDescriptionLength = 50;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.entity.title.length <= this.maxTitleLength) {
      this.shortTitle = this.entity.title;
    } else {
      this.shortTitle = this.entity.title.slice(0, this.maxTitleLength) + '...';
    }
    if (this.entity.description.length <= this.maxDescriptionLength) {
      this.shortDescription = this.entity.description;
    } else {
      this.shortDescription =
        this.entity.description.slice(0, this.maxDescriptionLength) + '...';
    }
  }

  go() {
    this.router.navigate(['/article-view', this.entity.id]);
  }
}
