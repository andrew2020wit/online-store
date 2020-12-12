import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../../../app-common/general.service';
import {
  CustomStringInputEvent,
  CustomStringInputModel,
} from '../../../custom-input/model/custom-string-input.model';
import { EnumInputModel } from '../../../custom-input/model/enum-input.model';
import { AuthService } from '../../auth.service';
import { UserEntity, UserGender } from '../../user.entity';

@Component({
  selector: 'app-edit-user-profile-form',
  templateUrl: './edit-user-profile-form.component.html',
  styleUrls: ['./edit-user-profile-form.component.scss'],
})
export class EditUserProfileFormComponent implements OnInit {
  userId: string;

  formFields = {
    fullName: new CustomStringInputModel('fullName'),
    gender: new EnumInputModel('gender'),
  };

  formValid = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private generalservice: GeneralService
  ) {
    for (let key in UserGender) {
      this.formFields.gender.values.push({ value: key, viewValue: key });
    }

    this.userId = this.authService.appUser.id;
    this.generalservice.isLoading$.next(true);
    this.authService.getUserEntity$(this.userId).subscribe((user) => {
      //   console.log('user', user);
      for (let x in this.formFields) {
        const obj = this.formFields[x];
        obj.initValue = user[x];
        this.formFields[x] = obj;
      }
      //  console.log('formFields', this.formFields);

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
    let isValid = false;
    for (let key in this.formFields) {
      isValid =
        isValid ||
        (this.formFields[key].isValid && this.formFields[key].isChanged);
    }
    this.formValid = isValid;
  }

  send() {
    if (!this.formValid) {
      return;
    }
    this.generalservice.isLoading$.next(true);

    const entity: UserEntity = {
      id: this.userId,
      fullName: this.formFields.fullName.value,
      gender: this.formFields.gender.value as UserGender,
    };
    // console.log('newUser', entity);

    this.authService.editUser$(entity).subscribe((message) => {
      //  console.log('mes', message);

      if (!message.ok) {
        alert(message.message);
        console.error(message.message);
      } else {
        alert('Chenged!');
        location.reload;
      }
      this.generalservice.isLoading$.next(false);
    });
  }
}
