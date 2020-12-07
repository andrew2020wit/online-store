import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ShareModule } from '../share.module';
import { AuthWidgetComponent } from './view/auth-widget/auth-widget.component';
import { EditUserProfileFormComponent } from './view/edit-user-profile-form/edit-user-profile-form.component';
import { EditUserProfilePageComponent } from './view/edit-user-profile-page/edit-user-profile-page.component';
import { LoginFormComponent } from './view/login-form/login-form.component';
import { LoginPageComponent } from './view/login-page/login-page.component';
import { UserRegisterFormComponent } from './view/user-register-form/user-register-form.component';
import { UserRegisterPageComponent } from './view/user-register-page/user-register-page.component';
import { UserWidgetComponent } from './view/user-widget/user-widget.component';

@NgModule({
  declarations: [
    AuthWidgetComponent,
    LoginFormComponent,
    UserRegisterFormComponent,
    UserWidgetComponent,
    LoginPageComponent,
    EditUserProfilePageComponent,
    EditUserProfileFormComponent,
    UserRegisterPageComponent,
  ],
  imports: [CommonModule, ShareModule, MatDialogModule],
  exports: [
    AuthWidgetComponent,
    LoginFormComponent,
    UserRegisterFormComponent,
    UserWidgetComponent,
    LoginPageComponent,
    UserRegisterPageComponent,
  ],
})
export class AuthModule {}
