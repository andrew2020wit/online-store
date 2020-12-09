import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  getFormatPhoneNumber,
  OutputPhoneNumberEvent,
  patternPhoneNumber,
} from './phone-number-utils';

@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss'],
})
export class PhoneInputComponent implements OnInit {
  @Input() initValue = '';
  @Output() onChanged = new EventEmitter<OutputPhoneNumberEvent>();
  value = '';
  isValid = false;

  label = 'Phone, like +38-099-123-1234';
  patternPhoneNumber = patternPhoneNumber;

  formValue = '+38-0';

  constructor() {}

  ngOnInit(): void {
    if (this.initValue) {
      this.setValue(this.initValue);
    }
  }

  onChange(event) {
    this.setValue(event.target.value);
  }

  setValue(value) {
    this.isValidCheck(value);
    if (this.isValid) {
      this.value = value.replace(/\D/g, '');
      console.log('this.value', this.value);
      this.formValue = getFormatPhoneNumber(this.value);
    }
    this.onChanged.emit({ value: this.value, isValid: this.isValid });
  }
  isValidCheck(str) {
    this.isValid = this.patternPhoneNumber.test(str);
    console.log('this.isValid', this.isValid);
  }
}
