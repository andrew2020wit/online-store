import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { IArticleHeader } from './../article-header.interface';

const ArticlesGQL = gql`
  query allArticles($take: Int, $createOnCursor: DateTime, $sample: String) {
    allArticles(take: $take, createOnCursor: $createOnCursor, sample: $sample) {
      id
      title
      description
      createdOn
      updatedOn
      author {
        id
        fullName
      }
    }
  }
`;

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss'],
})
export class ArticlesListComponent implements OnInit, AfterViewInit, OnDestroy {
  // intersection
  private intersectionObserver: IntersectionObserver;
  isIntersecting2 = false;

  articleHeaders: IArticleHeader[] = [];

  private querySubscription: Subscription;
  ArticlesWatchQuery: QueryRef<any>;
  takeV = 20;
  gqlSample = '';
  createOnCursor: Date = new Date();
  dataFinished = false;
  loading = false;
  errorLoading = false;

  filterInput: Element;
  filterInputKeyUp: Observable<Event>;

  constructor(private apollo: Apollo) {
    this.intersectionObserver = new IntersectionObserver(
      (entries) => this.intersectionCallback(entries),
      { rootMargin: '0px 0px 1000px 0px' }
    );
  }

  ngOnInit(): void {
    this.ArticlesWatchQuery = this.apollo.watchQuery<any>({
      query: ArticlesGQL,
      variables: {
        take: this.takeV,
        createOnCursor: this.createOnCursor,
      },
      errorPolicy: 'all',
    });
    setTimeout(() => this.autoLoader(), 200);
  }

  ngAfterViewInit(): void {
    this.intersectionObserver.observe(
      document.getElementById('IntersectionTarget')
    );

    this.querySubscription = this.ArticlesWatchQuery.valueChanges.subscribe(
      ({ data, loading }) => {
        this.loadArtHeaders({ data, loading });
      }
    );

    this.filterInput = document.querySelector('#filterInput');
    this.filterInputKeyUp = fromEvent(this.filterInput, 'keyup') as Observable<
      Event
    >;
    this.filterInputKeyUp
      .pipe(debounceTime(1000))
      .subscribe(() => this.titleFilterReLoad());
  }

  intersectionCallback(entries) {
    this.isIntersecting2 = entries[0].isIntersecting;
    // setTimeout(() => this.intersectionCallbackAsinc(), 0);
  }

  async autoLoader() {
    if (this.isIntersecting2 && !this.dataFinished) {
      this.loadArtHeadersNext();
    }
    if (!this.errorLoading) {
      setTimeout(() => this.autoLoader(), 200);
    }
  }

  loadArtHeaders({ data, loading }) {
    this.loading = loading;
    const newArticles: IArticleHeader[] = data.allArticles as IArticleHeader[];
    const length = newArticles.length;
    if (length < this.takeV) {
      this.dataFinished = true;
    }
    if (length > 0) {
      this.createOnCursor = newArticles[length - 1].createdOn;
    }
    this.articleHeaders.push(...newArticles);
  }

  loadArtHeadersNext() {
    if (this.dataFinished) {
      return;
    }
    this.ArticlesWatchQuery.fetchMore({
      variables: {
        createOnCursor: this.createOnCursor,
        sample: this.gqlSample,
      },
    }).then(
      ({ data, loading }) => {
        this.loadArtHeaders({ data, loading });
      },
      (error) => {
        this.errorLoading = true;
        console.log('errorLoading', error);
      }
    );
  }

  titleFilterReLoad() {
    this.articleHeaders = [];
    this.dataFinished = false;
    this.ArticlesWatchQuery.fetchMore({
      variables: {
        createOnCursor: new Date(),
        sample: this.gqlSample,
      },
    }).then(({ data, loading }) => {
      this.loadArtHeaders({ data, loading });
    });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
    this.intersectionObserver.disconnect();
  }
}
