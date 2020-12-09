import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { MustMatch } from '../validators/must-match.validator';

@Component({
  selector: 'app-user-register-form',
  templateUrl: './user-register-form.component.html',
  styleUrls: ['./user-register-form.component.scss'],
})
export class UserRegisterFormComponent implements OnInit {
  phoneForm = '+380';

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.formGroup = this.formBuilder.group(
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

  ngOnInit(): void {}

  get f() {
    return this.formGroup.controls;
  }

  registerUser() {
    const newUser = new CreateUserDto();
    newUser.login = this.formGroup.get('login').value;
    newUser.password = this.formGroup.get('password').value;
    newUser.fullName = this.formGroup.get('fullName').value;
    this.authService.createUser$(newUser).subscribe((m) => {
      console.log('statusMessage:', m);
    });
  }
  async continue() {
    await this.authService.getToken({
      login: this.formGroup.get('login').value,
      password: this.formGroup.get('password').value,
    });
    this.router.navigate(['']);
  }
}
