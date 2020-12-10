import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomStringInputEvent } from '../custom-input.module';

@Component({
  selector: 'app-w-password',
  templateUrl: './w-password.component.html',
  styleUrls: ['./w-password.component.scss'],
})
export class WPasswordComponent implements OnInit {
  @Input() key = '';
  @Input() minlength = 2;
  @Input() defaultLabel = `password, min ${this.minlength} symbol`;
  @Output() onChanged = new EventEmitter<CustomStringInputEvent>();
  value = '';

  label = this.defaultLabel;
  placeholder = this.defaultLabel;
  formValue = '';

  label2 = 'confirm password';
  placeholder2 = this.defaultLabel;
  formValue2 = '';

  isValid = false;

  constructor() {}

  ngOnInit(): void {}

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
      this.label = this.defaultLabel;
      this.label2 = this.defaultLabel;
    } else {
      this.value = '';
    }

    console.log('{ value: this.value, isValid: this.isValid }', {
      value: this.value,
      isValid: this.isValid,
    });

    this.onChanged.emit({
      value: this.value,
      isValid: this.isValid,
      key: this.key,
    });
  }
}
