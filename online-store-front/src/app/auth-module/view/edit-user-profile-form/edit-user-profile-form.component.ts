import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../../../app-common/general.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-edit-user-profile-form',
  templateUrl: './edit-user-profile-form.component.html',
  styleUrls: ['./edit-user-profile-form.component.scss'],
})
export class EditUserProfileFormComponent implements OnInit {
  userId: string;
  isLoad = false;

  formValid = false;

  phone = '';
  phoneValid = false;
  phoneInit = '';

  fullName = '';
  fullNameValid = false;
  fullNameInit = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private generalservice: GeneralService,
    private http: HttpClient
  ) {
    this.userId = this.authService.appUser.id;
    this.generalservice.isLoading$.next(true);
    this.authService.getUserEntity$(this.userId).subscribe((user) => {
      console.log('user', user);
      this.generalservice.isLoading$.next(false);
    });
  }

  ngOnInit(): void {}

  // changeStringEvent(customStringInputEvent: CustomStringInputEvent) {
  //   console.log('customStringInputEvent', customStringInputEvent);
  //   this[customStringInputEvent.key] = customStringInputEvent.value;
  //   this[customStringInputEvent.key + 'Valid'] = customStringInputEvent.isValid;
  //   this.formValidCheck();
  // }

  // formValidCheck() {
  //   this.formValid = this.phoneValid && this.fullNameValid;
  // }

  // send() {
  //   if (!this.formValid) {
  //     return;
  //   }
  //   this.generalservice.isLoading$.next(true);
  //   const newUser: UserEntity = {
  //     login: this.phone,
  //     phone: this.phone,
  //     fullName: this.fullName,
  //   };
  //   this.authService.createUser$(newUser).subscribe((message) => {
  //     console.log('mes', message);

  //     if (!message.ok) {
  //       alert(message.message);
  //       console.error(message.message);
  //     } else {
  //       this.authService.getToken({
  //         login: newUser.login,
  //         password: newUser.password,
  //       });
  //     }
  //     this.generalservice.isLoading$.next(false);
  //   });
  // }
}
