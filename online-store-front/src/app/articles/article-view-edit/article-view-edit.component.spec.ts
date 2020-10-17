import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleViewEditComponent } from './article-view-edit.component';

describe('ArticleViewEditComponent', () => {
  let component: ArticleViewEditComponent;
  let fixture: ComponentFixture<ArticleViewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleViewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
