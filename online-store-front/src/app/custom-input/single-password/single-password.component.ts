import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomStringInputEvent } from './../model/custom-string-input.model';

@Component({
  selector: 'app-single-password',
  templateUrl: './single-password.component.html',
  styleUrls: ['./single-password.component.scss'],
})
export class SinglePasswordComponent implements OnInit {
  @Input() label = 'Password';
  @Input() key: string;

  @Output() onChanged = new EventEmitter<CustomStringInputEvent>();

  minlength = 1;

  value = '';
  formValue = '';

  label1 = 'password';
  isValid = false;
  isChanged = false;

  constructor() {}

  ngOnInit(): void {}

  onChange(event) {
    this.checkField1();
    this.isValidCheck();
  }

  isValidCheck() {
    this.isValid = this.checkField1();

    if (this.isValid) {
      this.value = this.formValue;
    } else {
      this.value = '';
    }

    this.isChanged = !!this.value;

    this.onChanged.emit({
      value: this.value,
      isValid: this.isValid,
      key: this.key,
      isChanged: this.isChanged,
    });
  }

  checkField1() {
    if (this.formValue.length < this.minlength) {
      this.label1 = 'password to short!';
      this.formValue = '';
      return false;
    } else {
      this.label1 = this.label;
      return true;
    }
  }
}
