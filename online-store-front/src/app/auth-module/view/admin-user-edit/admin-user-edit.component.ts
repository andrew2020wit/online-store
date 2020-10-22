import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminUsersService } from '@app/auth-module/admin-users.service';
import { UserAdminView } from '@app/auth-module/dto/user-admin-view.dto';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrls: ['./admin-user-edit.component.scss'],
})
export class AdminUserEditComponent implements OnInit {
  userId: string;
  user: UserAdminView;
  isLoading = false;
  status: string;
  constructor(
    private route: ActivatedRoute,
    private adminUsersService: AdminUsersService
  ) {
    this.route.params.subscribe((par) => {
      this.userId = par[`id`];
      console.log('userId', this.userId);
    });
  }

  ngOnInit(): void {
    this.getUser(this.userId);
  }

  getUser(id: string) {
    this.adminUsersService.getUserById(id).subscribe((user) => {
      this.user = user;
    });
  }
  changeUser(userId: string, property: string, value: string) {
    this.isLoading = true;
    this.adminUsersService
      .changeUser(userId, property, value)
      .pipe(delay(3000))
      .subscribe((user) => {
        if (!user) {
          this.status = `change false`;
          this.isLoading = false;
        } else {
          location.reload();
        }
      });
  }
  changeIsActiveUser() {
    if (this.user.isActive) {
      if (confirm('DisActivate user?')) {
        this.changeUser(this.user.id, 'isActive', 'false');
      }
    }
    if (!this.user.isActive) {
      if (confirm('Activate user?')) {
        this.changeUser(this.user.id, 'isActive', 'true');
      }
    }
  }
}
