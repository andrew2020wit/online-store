import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  isOpen = true;

  constructor(private authService: AuthService) {
    this.authService.loginFrameOpened$.subscribe((x) => {
      this.isOpen = x;
    });
  }

  ngOnInit(): void {}

  hideLoginFrame() {
    this.authService.loginFrameOpened$.next(false);
  }
}
