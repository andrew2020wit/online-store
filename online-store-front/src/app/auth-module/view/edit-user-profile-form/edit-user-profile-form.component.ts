import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../../../app-common/general.service';
import { AuthService } from '../../auth.service';
import { UserEntity } from '../../user.entity';

@Component({
  selector: 'app-edit-user-profile-form',
  templateUrl: './edit-user-profile-form.component.html',
  styleUrls: ['./edit-user-profile-form.component.scss'],
})
export class EditUserProfileFormComponent implements OnInit {
  userId: string;
  keys = [
    'fullName',
    'defaultDeliverAddress',
    'gender',
    'email',
    'language',
    'birthday',
  ];
  defaultValue = {};
  value = {};
  resultValue = {};
  validationMessages = {};

  isChanged = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private generalservice: GeneralService
  ) {
    this.userId = this.authService.appUser.id;

    this.generalservice.isLoading$.next(true);

    this.authService.getUserEntity$(this.userId).subscribe((oldEntity) => {
      this.keys.forEach((key) => {
        this.defaultValue[key] = this.value[key] = this.resultValue[key] =
          oldEntity[key];
      });
      this.isChanged = false;
      // console.log('this.value', this.value);

      this.generalservice.isLoading$.next(false);
    });
  }

  ngOnInit(): void {}

  onChanged(event) {
    console.log('event', event);
    const target = event.target;
    const key = target.title;
    if (!target.validity.valid) {
      this.validationMessages[key] = target.validationMessage;
      this.resultValue[key] = this.defaultValue[key];
    } else {
      this.validationMessages[key] = '';
      this.resultValue[key] = target.value;
    }
    this.changeCheck();
  }

  onGenderSelect(event) {
    this.resultValue['gender'] = event.value;
    this.changeCheck();
  }

  dateChange(event) {
    console.log('dateChange', event);
    this.resultValue['birthday'] = event.value;
    this.changeCheck();
  }

  changeCheck() {
    let changed = false;
    this.keys.forEach((key) => {
      changed = changed || this.defaultValue[key] != this.resultValue[key];
    });
    this.isChanged = changed;
    console.log('resultValue', this.resultValue);
  }

  send() {
    if (!this.isChanged) {
      return;
    }
    const entity: UserEntity = {
      id: this.userId,
    };
    this.keys.forEach((key) => {
      if (this.defaultValue[key] != this.resultValue[key]) {
        entity[key] = this.resultValue[key];
      }
    });

    this.generalservice.isLoading$.next(true);

    console.log('newUser', entity);

    this.authService.editUser$(entity).subscribe(
      (message) => {
        console.log('mes', message);

        if (!message.ok) {
          alert(message.message);
          console.error(message.message);
        } else {
          alert('Chenged!');
          location.reload;
        }
        this.generalservice.isLoading$.next(false);
      },
      (err) => {
        this.generalservice.isLoading$.next(false);
        console.error(err);
      }
    );
  }
}
