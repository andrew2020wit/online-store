import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { UserEntity } from './../../user.entity';
import { formFieldsUserRegisterForm } from './formFields.const';

@Component({
  selector: 'app-user-register-form',
  templateUrl: './user-register-form.component.html',
  styleUrls: ['./user-register-form.component.scss'],
})
export class UserRegisterFormComponent implements OnInit {
  form = new FormGroup({});
  model = new UserEntity();
  fields = formFieldsUserRegisterForm;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  registerUser() {
    console.log(this.model);
    this.authService.createUser$(this.model).subscribe((message) => {
      console.log('createUser: ', message);

      if (message.ok) {
      }
    });
  }
}
