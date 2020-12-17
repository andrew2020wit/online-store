import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceSpanComponent } from './price-span.component';

describe('PriceSpanComponent', () => {
  let component: PriceSpanComponent;
  let fixture: ComponentFixture<PriceSpanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceSpanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceSpanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
