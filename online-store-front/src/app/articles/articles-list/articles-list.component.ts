import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ArticleEntity } from './../article.entity';
import { ArticlesService } from './../articles.service';
class InfiniteScrollStatus {
  isIntersecting = false;
  dataFinished = false;
  errorLoading = false;
  isLoading = false;
}

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss'],
})
export class ArticlesListComponent implements OnInit, AfterViewInit, OnDestroy {
  private intersectionObserver: IntersectionObserver;
  infiniteScrollStatus: InfiniteScrollStatus = {
    isIntersecting: false,
    dataFinished: false,
    errorLoading: false,
    isLoading: false,
  };

  entitys: ArticleEntity[] = [];

  //QueryDto
  take = 20;
  pattern = '';
  createOnCursor: Date = new Date();

  filterInput: Element;
  filterInputKeyUp: Observable<Event>;

  constructor(private entityService: ArticlesService) {
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
    this.autoLoader();
  }

  getEntity() {
    this.infiniteScrollStatus.isLoading = true;
    this.entityService
      .getEntity(this.take, this.createOnCursor, this.pattern)
      .subscribe((entitys) => {
        this.entitys.push(...entitys);
        this.infiniteScrollStatus.isLoading = false;
        if (entitys.length < this.take) {
          this.infiniteScrollStatus.dataFinished;
        }
      });
  }
}
