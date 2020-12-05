import { Component, OnInit } from '@angular/core';
import { ArticleTypes } from '../../../articles/article.entity';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
  articleType = ArticleTypes.review;

  constructor() {}

  ngOnInit(): void {}
}
