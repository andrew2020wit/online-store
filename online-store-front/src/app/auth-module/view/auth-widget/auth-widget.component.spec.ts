import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AuthWidgetComponent } from './auth-widget.component';

describe('AuthComponent', () => {
  let component: AuthWidgetComponent;
  let fixture: ComponentFixture<AuthWidgetComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AuthWidgetComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
