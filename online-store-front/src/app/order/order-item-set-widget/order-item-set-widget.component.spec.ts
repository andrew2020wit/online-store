import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemSetWidgetComponent } from './order-item-set-widget.component';

describe('OrderItemSetWidgetComponent', () => {
  let component: OrderItemSetWidgetComponent;
  let fixture: ComponentFixture<OrderItemSetWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderItemSetWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemSetWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
