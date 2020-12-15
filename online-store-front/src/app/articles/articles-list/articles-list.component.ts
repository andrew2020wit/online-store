import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { GeneralService } from '../../app-common/general.service';
import { ArticleEntity, ArticleTypes } from './../article.entity';
import { ArticlesService } from './../articles.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss'],
})
export class ArticlesListComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() componentId: string;
  @Input() articleType: ArticleTypes;

  baseComponentId = 'ArticlesListComponent';

  isFooterIntersected = true;
  FooterIntersectedSubscription: Subscription;

  queryDataFinished = false;
  errorLoading = false;
  isLoading = false;

  entitys: ArticleEntity[] = [];

  take = 20;
  pattern = '';
  createOnCursor: Date = new Date();
  entityType = '';

  labelFilterInput = '';
  filterInput: Element;
  filterInputKeyUp: Observable<Event>;
  filterInputKeyUpSubscription: Subscription;

  constructor(
    private entityService: ArticlesService,
    private generalService: GeneralService
  ) {}

  ngOnInit() {
    this.labelFilterInput =
      'labelFilterInput-' + this.baseComponentId + this.componentId;
    console.log('this.labelFilterInput ', this.labelFilterInput);

    this.entityType = this.articleType;

    this.FooterIntersectedSubscription = this.generalService.isFooterIntersected$.subscribe(
      (isFooterIntersected) => {
        console.log('generalService.isFooterIntersected$', isFooterIntersected);
        this.isFooterIntersected = isFooterIntersected;
        this.getNextChunk();
      }
    );
  }

  ngAfterViewInit(): void {
    this.filterInput = document.querySelector('#' + this.labelFilterInput);
    this.filterInputKeyUp = fromEvent(this.filterInput, 'keyup') as Observable<
      Event
    >;
    this.filterInputKeyUpSubscription = this.filterInputKeyUp
      .pipe(debounceTime(1000))
      .subscribe(() => this.titleFilterReLoad());
  }

  titleFilterReLoad() {
    this.restartEntityLoad();
  }

  ngOnDestroy() {
    this.FooterIntersectedSubscription.unsubscribe();
    this.filterInputKeyUpSubscription.unsubscribe();
  }

  restartEntityLoad() {
    this.entitys = [];
    this.queryDataFinished = false;
    this.errorLoading = false;
    this.isLoading = false;
    this.createOnCursor = new Date();
    this.getEntity();
  }

  getNextChunk() {
    console.log(
      '==== Not getNextChunk: ',
      this.queryDataFinished ||
        this.queryDataFinished ||
        this.errorLoading ||
        this.isLoading ||
        !this.isFooterIntersected
    );
    console.log('this.queryDataFinished', this.queryDataFinished);
    console.log('this.errorLoading', this.errorLoading);
    console.log('this.isLoading', this.isLoading);
    console.log('!this.isFooterIntersected', !this.isFooterIntersected);

    if (
      this.queryDataFinished ||
      this.errorLoading ||
      this.isLoading ||
      !this.isFooterIntersected
    ) {
      return;
    } else {
      this.getEntity();
    }
  }

  getEntity() {
    // console.log('getEntity');

    this.isLoading = true;
    this.entityService
      .queryEntitys({
        maxItemCount: this.take,
        createdOnLessThan: this.createOnCursor,
        pattern: this.pattern,
        entityType: this.articleType,
      })
      .subscribe(
        (entitys) => {
          const length = entitys.length;
          if (length < this.take) {
            this.queryDataFinished = true;
          }
          if (length > 0) {
            this.createOnCursor = entitys[length - 1].createdOn;
          }
          this.entitys.push(...entitys);
          this.isLoading = false;
          this.getNextChunk();
        },
        (err) => {
          console.error(err);
          this.errorLoading = true;
        }
      );
  }
}
