import { Component, OnInit } from '@angular/core';
import {
  CustomStringInputEvent,
  CustomStringInputModel,
} from '../../../custom-input/model/custom-string-input.model';
import { AuthService } from '../../auth.service';
import { LoginDto } from '../../dto/login.dto';
import { GeneralService } from './../../../app-common/general.service';

@Component({
  selector: 'app-phone-login-form',
  templateUrl: './phone-login-form.component.html',
  styleUrls: ['./phone-login-form.component.scss'],
})
export class PhoneLoginFormComponent implements OnInit {
  formValid = false;

  formFields = {
    phone: new CustomStringInputModel('phone'),
    password: new CustomStringInputModel('password'),
  };
  constructor(
    private authService: AuthService,
    private generalservice: GeneralService
  ) {}

  ngOnInit(): void {}

  changeStringEvent(customStringInputEvent: CustomStringInputEvent) {
    // console.log('customStringInputEvent', customStringInputEvent);
    this.formFields[customStringInputEvent.key].value =
      customStringInputEvent.value;
    this.formFields[customStringInputEvent.key].isValid =
      customStringInputEvent.isValid;
    this.formFields[customStringInputEvent.key].isChanged =
      customStringInputEvent.isChanged;
    this.formValidCheck();
    console.log('formFields', this.formFields);
  }

  formValidCheck() {
    let isValid = true;
    for (let x in this.formFields) {
      isValid = isValid && this.formFields[x].isValid;
    }
    this.formValid = isValid;
  }

  async login() {
    this.generalservice.isLoading$.next(true);
    const user = new LoginDto();
    user.login = this.formFields.phone.value;
    user.password = this.formFields.password.value;
    await this.authService.getToken(user);
    this.generalservice.isLoading$.next(false);
  }
}
