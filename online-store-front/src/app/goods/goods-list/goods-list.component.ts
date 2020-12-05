import { Component, OnInit } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { GoodsEntity } from './../goods.entity';
import { GoodsService } from './../goods.service';

class InfiniteScrollStatus {
  isIntersecting: boolean;
  dataFinished: boolean;
  errorLoading: boolean;
  isLoading: boolean;
}

@Component({
  selector: 'app-goods-list',
  templateUrl: './goods-list.component.html',
  styleUrls: ['./goods-list.component.scss'],
})
export class GoodsListComponent implements OnInit {
  private intersectionObserver: IntersectionObserver;
  infiniteScrollStatus: InfiniteScrollStatus = {
    isIntersecting: true,
    dataFinished: false,
    errorLoading: false,
    isLoading: false,
  };

  entitys: GoodsEntity[] = [];

  //QueryDto
  take = 20;
  pattern = '';
  createOnCursor: Date = new Date();

  filterInput: Element;
  filterInputKeyUp: Observable<Event>;

  constructor(private entityService: GoodsService) {
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        this.infiniteScrollStatus.isIntersecting = entries[0].isIntersecting;
      },
      { rootMargin: '0px 0px 1000px 0px' }
    );
    this.autoLoader();
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.intersectionObserver.observe(
      document.getElementById('IntersectionTarget')
    );
    this.filterInput = document.querySelector('#filterInput');
    this.filterInputKeyUp = fromEvent(this.filterInput, 'keyup') as Observable<
      Event
    >;
    this.filterInputKeyUp
      .pipe(debounceTime(1000))
      .subscribe(() => this.titleFilterReLoad());
  }

  titleFilterReLoad() {
    this.restartLoader();
  }

  ngOnDestroy() {
    this.intersectionObserver.disconnect();
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
      this.getEntity();
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
    this.createOnCursor = new Date();
    this.autoLoader();
  }

  getEntity() {
    this.infiniteScrollStatus.isLoading = true;
    this.entityService
      .queryEntitys(this.take, this.createOnCursor, this.pattern)
      .subscribe((entitys) => {
        const length = entitys.length;
        if (length < this.take) {
          this.infiniteScrollStatus.dataFinished = true;
        }
        if (length > 0) {
          this.createOnCursor = entitys[length - 1].createdOn;
        }
        this.entitys.push(...entitys);
        this.infiniteScrollStatus.isLoading = false;
      });
  }
}
