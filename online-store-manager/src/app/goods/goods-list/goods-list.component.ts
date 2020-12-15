import { Component, OnInit } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { GeneralService } from '../../app-common/general.service';
import { GoodsEntity } from './../goods.entity';
import { GoodsService } from './../goods.service';

@Component({
  selector: 'app-goods-list',
  templateUrl: './goods-list.component.html',
  styleUrls: ['./goods-list.component.scss'],
})
export class GoodsListComponent implements OnInit {
  isFooterIntersected = true;
  FooterIntersectedSubscription: Subscription;

  queryDataFinished = false;
  errorLoading = false;
  isLoading = false;

  entitys: GoodsEntity[] = [];

  //QueryDto
  take = 20;
  pattern = '';
  createOnCursor: Date = new Date();

  filterInput: Element;
  filterInputKeyUp: Observable<Event>;
  filterInputKeyUpSubscription: Subscription;

  constructor(
    private entityService: GoodsService,
    private generalService: GeneralService
  ) {}

  ngOnInit() {
    this.FooterIntersectedSubscription = this.generalService.isFooterIntersected$.subscribe(
      (isFooterIntersected) => {
        // console.log('generalService.isFooterIntersected$', isFooterIntersected);
        this.isFooterIntersected = isFooterIntersected;
        this.getNextChunk();
      }
    );
  }

  ngAfterViewInit(): void {
    this.filterInput = document.querySelector('#goodsListFilterInput');
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
    //   'getNextChunk',
    //   this.queryDataFinished,
    //   this.errorLoading,
    //   this.isLoading,
    //   !this.isFooterIntersected
    // );

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
      .queryEntitys(this.take, this.createOnCursor, this.pattern)
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
