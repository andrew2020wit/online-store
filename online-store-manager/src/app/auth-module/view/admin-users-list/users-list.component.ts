import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AdminUsersService } from './../../admin-users.service';
import { UserAdminView } from './../../dto/user-admin-view.dto';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class AdminUsersListComponent
  implements OnInit, AfterContentInit, AfterViewInit {
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

  serverPattern = '';
  filterInput: Element;
  filterInputKeyUp: Observable<Event>;

  constructor(
    private adminUsersService: AdminUsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.getUsersList());
  }

  ngAfterContentInit(): void {}

  ngAfterViewInit(): void {
    this.filterInput = document.querySelector('#inputServerFilter');
    this.filterInputKeyUp = fromEvent(this.filterInput, 'keyup') as Observable<
      Event
    >;
    this.filterInputKeyUp
      .pipe(debounceTime(1000))
      .subscribe(() => this.getUsersList());
  }

  async getUsersList() {
    this.adminUsersService
      .getUsersList(this.serverPattern)
      .subscribe((users) => {
        this.dataSource.data = users;
      });
    if (!!this.dataSource.data) {
      this.dataSource.sort = this.sort;
    }
  }

  applyLocalFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  goToEditUser(userId: string) {
    this.router.navigate(['/admin/user-edit/', userId]);
  }
}
