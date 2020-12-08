import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { UserEntity } from '../../user.entity';
import { formFieldsUserEditProfile } from './formFields.const';

@Component({
  selector: 'app-edit-user-profile-form',
  templateUrl: './edit-user-profile-form.component.html',
  styleUrls: ['./edit-user-profile-form.component.scss'],
})
export class EditUserProfileFormComponent implements OnInit {
  form = new FormGroup({});
  model = new UserEntity();
  fields = formFieldsUserEditProfile;
  userId: string;
  isLoad = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {
    this.userId = this.authService.appUser.id;
    this.authService.getUserEntity$(this.userId).subscribe((user) => {
      console.log('user', user);

      this.model = user;
      this.isLoad = true;
    });
  }

  ngOnInit(): void {}

  sendForm() {
    console.log('model', this.model);
  }
}
