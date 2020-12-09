import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { OutputPhoneNumberEvent } from '../../../custom-input/phone-input/phone-number-utils';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-user-register-form',
  templateUrl: './user-register-form.component.html',
  styleUrls: ['./user-register-form.component.scss'],
})
export class UserRegisterFormComponent implements OnInit {
  formValid = false;
  phone = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  changePhone(outputPhoneNumberEvent: OutputPhoneNumberEvent) {
    console.log('outputPhoneNumberEvent', outputPhoneNumberEvent);
  }
}
