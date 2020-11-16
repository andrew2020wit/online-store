import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ServerTestToolsComponent } from './server-test-tools.component';

describe('ServerTestToosComponent', () => {
  let component: ServerTestToolsComponent;
  let fixture: ComponentFixture<ServerTestToolsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ServerTestToolsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerTestToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
