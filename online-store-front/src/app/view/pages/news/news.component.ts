import { Component, OnInit } from '@angular/core';
import { ArticleTypes } from './../../../articles/article.entity';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  articleType = ArticleTypes.news;

  constructor() {}

  ngOnInit(): void {}
}
