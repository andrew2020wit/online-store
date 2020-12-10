import { Component, OnInit } from '@angular/core';
import {
  CustomStringInputEvent,
  CustomStringInputModel,
} from '../../../custom-input/model/custom-string-input.model';
import { AuthService } from '../../auth.service';
import { GeneralService } from './../../../app-common/general.service';
import { UserEntity } from './../../user.entity';

@Component({
  selector: 'app-user-register-form',
  templateUrl: './user-register-form.component.html',
  styleUrls: ['./user-register-form.component.scss'],
})
export class UserRegisterFormComponent implements OnInit {
  formValid = false;

  formFields = {
    phone: new CustomStringInputModel('phone'),
    fullName: new CustomStringInputModel('fullName'),
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

  send() {
    if (!this.formValid) {
      return;
    }
    this.generalservice.isLoading$.next(true);
    const newUser: UserEntity = {
      login: this.formFields.phone.value,
      phone: this.formFields.phone.value,
      fullName: this.formFields.fullName.value,
      password: this.formFields.password.value,
    };
    console.log('newUser', newUser);

    this.authService.createUser$(newUser).subscribe((message) => {
      console.log('mes', message);

      if (!message.ok) {
        alert(message.message);
        console.error(message.message);
      } else {
        this.authService.getToken({
          login: newUser.login,
          password: newUser.password,
        });
      }
      this.generalservice.isLoading$.next(false);
    });
  }
}
