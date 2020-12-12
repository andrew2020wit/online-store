import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../../../app-common/general.service';
import {
  CustomStringInputEvent,
  CustomStringInputModel,
} from '../../../custom-input/model/custom-string-input.model';
import { AuthService } from '../../auth.service';
import { UserEntity } from '../../user.entity';

@Component({
  selector: 'app-edit-user-profile-form',
  templateUrl: './edit-user-profile-form.component.html',
  styleUrls: ['./edit-user-profile-form.component.scss'],
})
export class EditUserProfileFormComponent implements OnInit {
  userId: string;

  formFields = {
    phone: new CustomStringInputModel('phone'),
    fullName: new CustomStringInputModel('fullName'),
  };

  formValid = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private generalservice: GeneralService
  ) {
    this.userId = this.authService.appUser.id;
    this.generalservice.isLoading$.next(true);
    this.authService.getUserEntity$(this.userId).subscribe((user) => {
      console.log('user', user);
      for (let x in this.formFields) {
        const obj = this.formFields[x];
        obj.initValue = user[x];
        this.formFields[x] = obj;
      }
      console.log('formFields', this.formFields);

      this.generalservice.isLoading$.next(false);
    });
  }

  ngOnInit(): void {}

  changeStringEvent(customStringInputEvent: CustomStringInputEvent) {
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
    const entity: UserEntity = {
      login: this.formFields.phone.value,
      phone: this.formFields.phone.value,
      fullName: this.formFields.fullName.value,
    };
    console.log('newUser', entity);

    this.authService.editUser$(entity).subscribe((message) => {
      console.log('mes', message);

      if (!message.ok) {
        alert(message.message);
        console.error(message.message);
      } else {
        this.authService.getToken({
          login: entity.login,
          password: entity.password,
        });
      }
      this.generalservice.isLoading$.next(false);
    });
  }
}
