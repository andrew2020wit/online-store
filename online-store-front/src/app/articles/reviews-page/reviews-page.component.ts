import { Component, OnInit } from '@angular/core';
import { ArticleTypes } from '../article.entity';

@Component({
  selector: 'app-reviews-page',
  templateUrl: './reviews-page.component.html',
  styleUrls: ['./reviews-page.component.scss'],
})
export class ReviewsPageComponent implements OnInit {
  articleType = ArticleTypes.review;

  constructor() {}

  ngOnInit(): void {}
}
