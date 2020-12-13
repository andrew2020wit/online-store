import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneLoginFormComponent } from './phone-login-form.component';

describe('PhoneLoginFormComponent', () => {
  let component: PhoneLoginFormComponent;
  let fixture: ComponentFixture<PhoneLoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneLoginFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
