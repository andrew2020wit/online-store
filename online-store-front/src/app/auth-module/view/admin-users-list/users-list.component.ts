import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminUsersService } from './../../admin-users.service';
import { UserAdminView } from './../../dto/user-admin-view.dto';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class AdminUsersListComponent implements OnInit, AfterContentInit {
  displayedColumns: string[] = [
    'id',
    'login',
    'fullName',
    'role',
    'isActive',
    'createdOn',
    'updatedOn',
    'tabAction',
  ];
  dataSource = new MatTableDataSource<UserAdminView>(null);

  @ViewChild(MatSort) sort: MatSort;

  constructor(private adminUsersService: AdminUsersService) {
    this.adminUsersService.httpLoadUsers();
  }

  ngOnInit(): void {
    this.adminUsersService.users$.subscribe((users) => {
      this.dataSource.data = users;
      if (!!users) {
        this.dataSource.sort = this.sort;
      }
    });
  }

  ngAfterContentInit(): void {}

  applyLocalFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  activateUser(userId, isActive) {
    this.adminUsersService.activateUser(userId, isActive);
  }
}
