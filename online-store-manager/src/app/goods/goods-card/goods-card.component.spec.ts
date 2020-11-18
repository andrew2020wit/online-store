import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { GoodsCardComponent } from './goods-card.component';

describe('ArticleHeaderCardComponent', () => {
  let component: GoodsCardComponent;
  let fixture: ComponentFixture<GoodsCardComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [GoodsCardComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
