import { Component, OnInit } from '@angular/core';
import { ArticleTypes } from '../article.entity';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
})
export class NewsPageComponent implements OnInit {
  articleType = ArticleTypes.news;

  constructor() {}

  ngOnInit(): void {}
}
