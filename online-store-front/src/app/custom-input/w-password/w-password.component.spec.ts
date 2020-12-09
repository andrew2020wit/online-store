import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WPasswordComponent } from './w-password.component';

describe('WPasswordComponent', () => {
  let component: WPasswordComponent;
  let fixture: ComponentFixture<WPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
