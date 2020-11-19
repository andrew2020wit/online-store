import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth-module/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {
    this.authService.loadLocalToken();
  }
  ngOnInit(): void {}

  toHome() {
    this.router.navigate(['']);
    setTimeout(() => document.location.reload(), 0);
  }
}
