import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePasswordComponent } from './single-password.component';

describe('SinglePasswordComponent', () => {
  let component: SinglePasswordComponent;
  let fixture: ComponentFixture<SinglePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglePasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
