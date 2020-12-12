import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomStringInputEvent } from './../model/custom-string-input.model';

@Component({
  selector: 'app-w-password',
  templateUrl: './w-password.component.html',
  styleUrls: ['./w-password.component.scss'],
})
export class WPasswordComponent implements OnInit {
  @Input() label = 'Password';
  @Input() key: string;

  @Output() onChanged = new EventEmitter<CustomStringInputEvent>();

  minlength = 2;

  value = '';
  formValue = '';

  label1 = 'password';
  label2 = 'confirm password';
  label2def = 'confirm password';
  formValue2 = '';
  isValid = false;
  isChanged = false;

  constructor() {}

  ngOnInit(): void {
    this.label = this.label + ` min ${this.minlength} symbols`;
  }

  onChange(event) {
    this.checkField1();
    this.isValidCheck();
  }

  onChange2(event) {
    this.checkField2();
    this.isValidCheck();
  }

  isValidCheck() {
    this.isValid = this.checkField1() && this.checkField2();

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
      this.formValue2 = '';
      this.checkField2();
      return false;
    } else {
      this.label1 = this.label;
      return true;
    }
  }

  checkField2() {
    if (this.formValue !== this.formValue2) {
      this.formValue2 = '';
      this.label2 = 'passwords not equal!';
      return false;
    } else {
      this.label2 = this.label2def;
      return true;
    }
  }
}
