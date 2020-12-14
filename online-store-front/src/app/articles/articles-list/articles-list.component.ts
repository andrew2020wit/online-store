import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { QueryEntityDto } from '../../global-interface/dto/query-entity.dto';
import { ArticleEntity, ArticleTypes } from './../article.entity';
import { ArticlesService } from './../articles.service';
class InfiniteScrollStatus {
  isIntersecting: boolean;
  dataFinished: boolean;
  errorLoading: boolean;
  isLoading: boolean;
  intersectId: string;
}

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss'],
})
export class ArticlesListComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() componentId: string;
  @Input() articleType: ArticleTypes;

  baseComponentId = 'ArticlesListComponent';

  private intersectionObserver: IntersectionObserver;
  infiniteScrollStatus: InfiniteScrollStatus = {
    isIntersecting: true,
    dataFinished: false,
    errorLoading: false,
    isLoading: false,
    intersectId: '',
  };

  entitys: ArticleEntity[] = [];

  queryEntityDto: QueryEntityDto = {
    maxItemCount: 20,
  };

  labelFilterInput = '';
  filterInput: Element;
  filterInputKeyUp: Observable<Event>;
  subscriptionFilterInputKeyUp: Subscription;

  constructor(private entityService: ArticlesService) {
    this.queryEntityDto.createdOnLessThan = new Date();
  }

  ngOnInit() {
    this.labelFilterInput =
      'labelFilterInput-' + this.baseComponentId + this.componentId;
    console.log('this.labelFilterInput ', this.labelFilterInput);

    this.infiniteScrollStatus.intersectId =
      'intersectId' + this.baseComponentId + this.componentId;

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        this.infiniteScrollStatus.isIntersecting = entries[0].isIntersecting;
      },
      { rootMargin: '0px 0px 1000px 0px' }
    );

    this.queryEntityDto.entityType = this.articleType;

    this.autoLoader();
  }

  ngAfterViewInit(): void {
    this.intersectionObserver.observe(
      document.getElementById(this.infiniteScrollStatus.intersectId)
    );

    this.filterInput = document.querySelector('#' + this.labelFilterInput);
    this.filterInputKeyUp = fromEvent(this.filterInput, 'keyup') as Observable<
      Event
    >;
    this.subscriptionFilterInputKeyUp = this.filterInputKeyUp
      .pipe(debounceTime(1000))
      .subscribe(() => this.titleFilterReLoad());
  }

  titleFilterReLoad() {
    this.restartLoader();
  }

  ngOnDestroy() {
    this.intersectionObserver.disconnect();
    this.subscriptionFilterInputKeyUp.unsubscribe();
  }

  autoLoader() {
    if (
      this.infiniteScrollStatus.dataFinished ||
      this.infiniteScrollStatus.errorLoading
    ) {
      return;
    }
    if (
      !this.infiniteScrollStatus.isLoading &&
      this.infiniteScrollStatus.isIntersecting
    ) {
      console.log(
        'this.infiniteScrollStatus.isIntersecting',
        this.infiniteScrollStatus.isIntersecting
      );

      this.getEntity();
      console.log('fsdfsd');
    }
    setTimeout(() => {
      this.autoLoader();
    }, 200);
  }

  restartLoader() {
    this.entitys = [];
    this.infiniteScrollStatus.dataFinished = false;
    this.infiniteScrollStatus.errorLoading = false;
    this.infiniteScrollStatus.isLoading = false;
    this.queryEntityDto.createdOnLessThan = new Date();
    this.autoLoader();
  }

  getEntity() {
    this.infiniteScrollStatus.isLoading = true;

    console.log('this.queryEntityDto', this.queryEntityDto);

    this.entityService
      .queryEntitys(this.queryEntityDto)
      .subscribe((entitys) => {
        console.log('entitys', entitys);
        console.log('this.infiniteScrollStatus', this.infiniteScrollStatus);
        //console.log('entitys', entitys);

        const length = entitys.length;
        if (length < this.queryEntityDto.maxItemCount) {
          this.infiniteScrollStatus.dataFinished = true;
        }
        if (length > 0) {
          this.queryEntityDto.createdOnLessThan = entitys[length - 1].createdOn;
        }
        this.entitys.push(...entitys);
        this.infiniteScrollStatus.isLoading = false;
      });
  }
}
