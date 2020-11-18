import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminUsersService } from '@app/auth-module/admin-users.service';
import { UserAdminView } from '@app/auth-module/dto/user-admin-view.dto';

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

  setUserRoleAs(role: string) {
    this.changeUser(this.user.id, 'role', role);
  }
}
