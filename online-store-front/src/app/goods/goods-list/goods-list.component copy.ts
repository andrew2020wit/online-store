import { Component, OnInit } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { IGoods } from '../goods.interface';

const GoodsGQL = gql`
  query getGoods($take: Int, $createOnCursor: DateTime, $sample: String) {
    getGoods(take: $take, createOnCursor: $createOnCursor, sample: $sample) {
      id
      name
      description
      createdOn
      updatedOn
      price
      smallPhotoUrl
    }
  }
`;

@Component({
  selector: 'app-goods-list',
  templateUrl: './goods-list.component.html',
  styleUrls: ['./goods-list.component.scss'],
})
export class GoodsListComponent implements OnInit {
  private intersectionObserver: IntersectionObserver;
  isIntersecting2 = false;

  goods: IGoods[] = [];

  private querySubscription: Subscription;
  GoodsWatchQuery: QueryRef<any>;
  takeV = 40;
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
    this.GoodsWatchQuery = this.apollo.watchQuery<any>({
      query: GoodsGQL,
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

    this.querySubscription = this.GoodsWatchQuery.valueChanges.subscribe(
      ({ data, loading }) => {
        this.loadGoods({ data, loading });
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
      this.loadGoodsNext();
    }
    if (!this.errorLoading) {
      setTimeout(() => this.autoLoader(), 200);
    }
  }

  loadGoods({ data, loading }) {
    this.loading = loading;
    const newGoods: IGoods[] = data.getGoods as IGoods[];
    const length = newGoods.length;
    if (length < this.takeV) {
      this.dataFinished = true;
    }
    if (length > 0) {
      this.createOnCursor = newGoods[length - 1].createdOn;
    }
    this.goods.push(...newGoods);
  }

  loadGoodsNext() {
    if (this.dataFinished) {
      return;
    }
    this.GoodsWatchQuery.fetchMore({
      variables: {
        createOnCursor: this.createOnCursor,
        sample: this.gqlSample,
      },
    }).then(
      ({ data, loading }) => {
        this.loadGoods({ data, loading });
      },
      (error) => {
        this.errorLoading = true;
        console.log('errorLoading', error);
      }
    );
  }

  titleFilterReLoad() {
    this.goods = [];
    this.dataFinished = false;
    this.GoodsWatchQuery.fetchMore({
      variables: {
        createOnCursor: new Date(),
        sample: this.gqlSample,
      },
    }).then(({ data, loading }) => {
      this.loadGoods({ data, loading });
    });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
    this.intersectionObserver.disconnect();
  }
}
