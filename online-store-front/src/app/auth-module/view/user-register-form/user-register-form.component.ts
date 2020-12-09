import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomStringInputEvent } from '../../../custom-input/custom-input.module';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-user-register-form',
  templateUrl: './user-register-form.component.html',
  styleUrls: ['./user-register-form.component.scss'],
})
export class UserRegisterFormComponent implements OnInit {
  formValid = false;

  userPhone = '';
  userPhoneValid = false;
  userPassWord = '';
  userPassWordValid = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  changeStringEvent(customStringInputEvent: CustomStringInputEvent) {
    console.log('customStringInputEvent', customStringInputEvent);
    this[customStringInputEvent.key] = customStringInputEvent.value;
    this[customStringInputEvent.key + 'Valid'] = customStringInputEvent.isValid;
    this.formValidCheck();
  }

  formValidCheck() {
    this.formValid = this.userPassWordValid && this.userPhoneValid;
  }

  send() {}
}
