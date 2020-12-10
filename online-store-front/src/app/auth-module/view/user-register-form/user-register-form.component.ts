import { Component, OnInit } from '@angular/core';
import { CustomStringInputEvent } from '../../../custom-input/custom-input.module';
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

  userPhone = '';
  userPhoneValid = false;
  userPassWord = '';
  userPassWordValid = false;
  userFullName = '';
  userFullNameValid = false;

  constructor(
    private authService: AuthService,
    private generalservice: GeneralService
  ) {}

  ngOnInit(): void {}

  changeStringEvent(customStringInputEvent: CustomStringInputEvent) {
    console.log('customStringInputEvent', customStringInputEvent);
    this[customStringInputEvent.key] = customStringInputEvent.value;
    this[customStringInputEvent.key + 'Valid'] = customStringInputEvent.isValid;
    this.formValidCheck();
  }

  formValidCheck() {
    this.formValid =
      this.userPassWordValid && this.userPhoneValid && this.userFullNameValid;
  }

  send() {
    if (!this.formValid) {
      return;
    }
    this.generalservice.isLoading$.next(true);
    const newUser: UserEntity = {
      login: this.userPhone,
      phone: this.userPhone,
      fullName: this.userFullName,
      password: this.userPassWord,
    };
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
