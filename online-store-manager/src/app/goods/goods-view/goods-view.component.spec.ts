import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { GoodsViewComponent } from './goods-view.component';

describe('ArticleViewComponent', () => {
  let component: GoodsViewComponent;
  let fixture: ComponentFixture<GoodsViewComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [GoodsViewComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
