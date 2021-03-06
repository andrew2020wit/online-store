import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ShareModule } from '../share.module';
import { AdminUsersListComponent } from './view/admin-users-list/users-list.component';
import { AuthComponent } from './view/auth-component/auth.component';
import { LoginFormComponent } from './view/login-form/login-form.component';
import { ServerTestToolsComponent } from './view/server-test-tools/server-test-tools.component';
import { UserProfileComponent } from './view/user-profile/user-profile.component';
import { UserRegisterFormComponent } from './view/user-register-form/user-register-form.component';
import { UserWidgetComponent } from './view/user-widget/user-widget.component';
import { AdminUserEditComponent } from './view/admin-user-edit/admin-user-edit.component';
import { LoginPageComponent } from './view/login-page/login-page.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginFormComponent,
    UserRegisterFormComponent,
    UserWidgetComponent,
    UserProfileComponent,
    AdminUsersListComponent,
    ServerTestToolsComponent,
    AdminUserEditComponent,
    LoginPageComponent,
  ],
  imports: [CommonModule, ShareModule, MatDialogModule],
  exports: [AuthComponent, AdminUsersListComponent, ServerTestToolsComponent],
})
export class AuthModule {}
