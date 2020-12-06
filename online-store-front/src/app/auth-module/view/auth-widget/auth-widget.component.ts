import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-auth-widget',
  templateUrl: './auth-widget.component.html',
  styleUrls: ['./auth-widget.component.scss'],
})
export class AuthWidgetComponent implements OnInit {
  isLogged = false;
  constructor(private authService: AuthService) {
    this.authService.appUser$.subscribe((user) => {
      this.isLogged = !!user;
    });
  }

  ngOnInit(): void {}
  openLoginFrame() {
    this.authService.loginFrameOpened$.next(true);
  }
}
