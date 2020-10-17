import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StatusMessageDto } from '../../../dto/status-message.dto';
import { AuthService } from '../../auth.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { MustMatch } from '../validators/must-match.validator';

@Component({
  selector: 'app-new-user',
  templateUrl: './user-register-form.component.html',
  styleUrls: ['./user-register-form.component.scss'],
})
export class UserRegisterFormComponent implements OnInit {
  registerForm: FormGroup;
  statusMessage = new StatusMessageDto();
  isLogged = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.appUser$.subscribe((user) => {
      this.isLogged = !!user;
    });
    this.registerForm = this.formBuilder.group(
      {
        login: ['', [Validators.required, Validators.minLength(2)]],
        fullName: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  ngOnInit(): void {
    if (this.isLogged) {
      const user = this.authService.appUser;
      this.registerForm.get('login').setValue(user.login);
      this.registerForm.get('fullName').setValue(user.fullName);
    }
  }

  get f() {
    return this.registerForm.controls;
  }

  registerUser() {
    const newUser = new CreateUserDto();
    newUser.login = this.registerForm.get('login').value;
    newUser.password = this.registerForm.get('password').value;
    newUser.fullName = this.registerForm.get('fullName').value;
    this.authService.createUser$(newUser).subscribe((m) => {
      this.statusMessage = m;
      console.log('statusMessage:', m);
    });
  }
  async continue() {
    await this.authService.getToken({
      login: this.registerForm.get('login').value,
      password: this.registerForm.get('password').value,
    });
    this.router.navigate(['']);
  }
  async editUserData() {
    const newUser = new CreateUserDto();
    newUser.login = this.registerForm.get('login').value;
    newUser.password = this.registerForm.get('password').value;
    newUser.fullName = this.registerForm.get('fullName').value;
    this.authService.editUser$(newUser).subscribe((m) => {
      this.statusMessage = m;
      console.log('editUser:', m);
    });
    // this.authService.logout();
    setTimeout(() => {
      this.authService.getToken({
        login: newUser.login,
        password: newUser.password,
      });
    }, 500);
  }
}
