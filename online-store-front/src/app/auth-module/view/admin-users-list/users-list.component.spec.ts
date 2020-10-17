import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminUsersListComponent } from './users-list.component';

describe('UsersListComponent', () => {
  let component: AdminUsersListComponent;
  let fixture: ComponentFixture<AdminUsersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUsersListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
