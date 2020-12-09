import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomStringInputEvent } from '../custom-input.module';
import { getFormatPhoneNumber, patternPhoneNumber } from './phone-number-utils';

@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss'],
})
export class PhoneInputComponent implements OnInit {
  @Input() key = '';
  @Input() initValue = '';
  @Output() onChanged = new EventEmitter<CustomStringInputEvent>();
  @Input() label = 'Phone, like +38-099-123-1234';

  value = '';
  isValid = false;

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
    this.onChanged.emit({
      value: this.value,
      isValid: this.isValid,
      key: this.key,
    });
  }
  isValidCheck(str) {
    this.isValid = this.patternPhoneNumber.test(str);
    console.log('this.isValid', this.isValid);
  }
}
