import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/auth-module/auth.service';
import { LoginDto } from '../../dto/login.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  newLoginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.newLoginForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  async login() {
    const user = new LoginDto();
    user.login = this.newLoginForm.get('login').value;
    user.password = this.newLoginForm.get('password').value;
    await this.authService.getToken(user);
    setTimeout(() => location.reload(), 100);
  }
}
