import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UserRegisterFormComponent } from './user-register-form.component';

describe('NewLoginComponent', () => {
  let component: UserRegisterFormComponent;
  let fixture: ComponentFixture<UserRegisterFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UserRegisterFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
