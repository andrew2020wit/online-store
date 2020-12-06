import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserProfilePageComponent } from './edit-user-profile-page.component';

describe('EditUserProfilePageComponent', () => {
  let component: EditUserProfilePageComponent;
  let fixture: ComponentFixture<EditUserProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserProfilePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
