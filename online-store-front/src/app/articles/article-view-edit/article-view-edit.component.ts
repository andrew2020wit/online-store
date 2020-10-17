import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { AuthService } from './../../auth-module/auth.service';
import { ArticlesService } from './../articles.service';

const ArticleGQL = gql`
  query getArticle($artId: String!) {
    getArticle(artId: $artId) {
      id
      title
      description
      text
      createdOn
      updatedOn
      author {
        id
        fullName
      }
    }
  }
`;

interface IArticle {
  id: string;
  title: string;
  description: string;
  text: string;
  createdOn: Date;
  updatedOn: Date;
  author: {
    id: string;
    fullName: string;
  };
}

@Component({
  selector: 'app-article-view-edit',
  templateUrl: './article-view-edit.component.html',
  styleUrls: ['./article-view-edit.component.scss'],
})
export class ArticleViewEditComponent implements OnInit {
  ArticleWatchQuery: QueryRef<any>;
  artId: string;

  title: string;
  description: string;
  text: string;
  createdOn: Date;
  updatedOn: Date;
  authorFullName: string;
  authorId: string;
  appUserId: string;
  isAdmin = false;

  constructor(
    private apollo: Apollo,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private articleService: ArticlesService
  ) {
    this.artId = this.activateRoute.snapshot.params['id'];
    const appUser = this.authService.appUser;
    if (appUser) {
      this.appUserId = appUser.sub;
      if (appUser.role === 'admin') {
        this.isAdmin = true;
      }
    }
  }

  ngOnInit(): void {
    this.apollo
      .watchQuery<any>({
        query: ArticleGQL,
        variables: {
          artId: this.artId,
        },
      })
      .valueChanges.subscribe(({ data, loading }) => {
        const art = data.getArticle as IArticle;
        this.title = art.title;
        this.text = art.text;
        this.description = art.description;
        this.createdOn = art.createdOn;
        this.updatedOn = art.updatedOn;
        this.authorFullName = art.author.fullName;
        this.authorId = art.author.id;
      });
  }

  deleteArticle() {
    if (!confirm('Article will be deleted')) {
      return;
    }
    this.articleService
      .disActiveArticle$(this.artId)
      .subscribe((x) => console.log('deleteArticle ', x));
    this.router.navigate(['']);
  }
}
