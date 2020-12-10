import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  CustomStringInputEvent,
  CustomStringInputModel,
} from './../model/custom-string-input.model';

@Component({
  selector: 'app-w-password',
  templateUrl: './w-password.component.html',
  styleUrls: ['./w-password.component.scss'],
})
export class WPasswordComponent implements OnInit {
  @Input() init: CustomStringInputModel;
  @Output() onChanged = new EventEmitter<CustomStringInputEvent>();

  minlength = 2;

  value = '';
  label = '';
  formValue = '';

  label2 = 'confirm password';
  formValue2 = '';
  isValid = false;
  isChanged = false;

  constructor() {}

  ngOnInit(): void {
    this.label = this.init.label + ` min ${this.minlength} symbols`;
    if (this.init.initValue) {
      this.value = this.formValue = this.formValue2 = this.init.initValue;
      this.isValidCheck();
    }
  }

  onChange(event) {
    if (this.formValue.length < this.minlength) {
      this.label = 'password to short!';
      this.formValue = '';
    }
    this.isValidCheck();
  }

  onChange2(event) {
    if (this.formValue.length < this.minlength) {
      this.formValue2 = '';
      this.label2 = 'password to short!';
    } else if (this.formValue !== this.formValue2) {
      this.formValue2 = '';
      this.label2 = 'passwords not equal!';
    }

    this.isValidCheck();
  }

  isValidCheck() {
    this.isValid =
      this.formValue == this.formValue2 &&
      this.formValue.length >= this.minlength;

    if (this.isValid) {
      this.value = this.formValue;
      this.label = this.init.label;
      this.label2 = this.init.label;
    } else {
      this.value = '';
    }

    // console.log('{ value: this.value, isValid: this.isValid }', {
    //   value: this.value,
    //   isValid: this.isValid,
    // });

    this.isChanged = this.value != this.init.initValue;

    this.onChanged.emit({
      value: this.value,
      isValid: this.isValid,
      key: this.init.key,
      isChanged: this.isChanged,
    });
  }
}
