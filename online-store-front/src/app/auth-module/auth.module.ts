import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExternalShareModule } from '../share/external-share.module';
import { InternalShareModule } from '../share/internal-share.module';
import { MaterialShareModule } from '../share/material-share.module';
import { AuthWidgetComponent } from './view/auth-widget/auth-widget.component';
import { EditUserProfileFormComponent } from './view/edit-user-profile-form/edit-user-profile-form.component';
import { EditUserProfilePageComponent } from './view/edit-user-profile-page/edit-user-profile-page.component';
import { LoginFormComponent } from './view/login-form/login-form.component';
import { LoginPageComponent } from './view/login-page/login-page.component';
import { PhoneLoginFormComponent } from './view/phone-login-form/phone-login-form.component';
import { UserRegisterFormComponent } from './view/user-register-form/user-register-form.component';
import { UserRegisterPageComponent } from './view/user-register-page/user-register-page.component';
import { UserWidgetComponent } from './view/user-widget/user-widget.component';

const exportModules = [
  AuthWidgetComponent,
  LoginFormComponent,
  UserRegisterFormComponent,
  UserWidgetComponent,
  LoginPageComponent,
  UserRegisterPageComponent,
  EditUserProfilePageComponent,
  EditUserProfileFormComponent,
  PhoneLoginFormComponent,
];

@NgModule({
  declarations: [...exportModules],
  imports: [
    CommonModule,
    ExternalShareModule,
    MaterialShareModule,
    InternalShareModule,
  ],
  exports: [...exportModules],
})
export class AuthModule {}
