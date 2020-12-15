import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { GeneralService } from '../../app-common/general.service';
import { ArticleEntity } from './../article.entity';
import { ArticlesService } from './../articles.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss'],
})
export class ArticlesListComponent implements OnInit, AfterViewInit, OnDestroy {
  isIntersecting = true;
  queryDataFinished = false;
  errorLoading = false;
  isLoading = false;

  isFooterIntersected = true;
  FooterIntersectedSubscription: Subscription;

  entitys: ArticleEntity[] = [];

  //QueryDto
  take = 20;
  pattern = '';
  createOnCursor: Date = new Date();

  filterInput: Element;
  filterInputKeyUp: Observable<Event>;
  filterInputKeyUpSubscription: Subscription;

  constructor(
    private entityService: ArticlesService,
    private generalService: GeneralService
  ) {}

  ngOnInit() {
    this.FooterIntersectedSubscription = this.generalService.isFooterIntersected$.subscribe(
      (isFooterIntersected) => {
        console.log('generalService.isFooterIntersected$', isFooterIntersected);
        this.isFooterIntersected = isFooterIntersected;
        this.getNextChunk();
      }
    );
  }

  ngAfterViewInit(): void {
    this.filterInput = document.querySelector('#filterInputArticlesList');
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
    // console.log(
    //   '==== Not getNextChunk: ',
    //   this.queryDataFinished ||
    //     this.queryDataFinished ||
    //     this.errorLoading ||
    //     this.isLoading ||
    //     !this.isFooterIntersected
    // );
    // console.log('this.queryDataFinished', this.queryDataFinished);
    // console.log('this.errorLoading', this.errorLoading);
    // console.log('this.isLoading', this.isLoading);
    // console.log('!this.isFooterIntersected', !this.isFooterIntersected);

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
    this.isLoading = true;
    this.entityService
      .queryEntitys(this.take, this.createOnCursor, this.pattern)
      .subscribe((entitys) => {
        const length = entitys.length;
        if (length < this.take) {
          this.queryDataFinished = true;
        }
        if (length > 0) {
          this.createOnCursor = entitys[length - 1].createdOn;
        }
        this.entitys.push(...entitys);
        this.isLoading = false;
      });

    // console.log('');
  }
}
