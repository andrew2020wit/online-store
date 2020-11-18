import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ArticleHeaderCardComponent } from './article-header-card.component';

describe('ArticleHeaderCardComponent', () => {
  let component: ArticleHeaderCardComponent;
  let fixture: ComponentFixture<ArticleHeaderCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleHeaderCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleHeaderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
