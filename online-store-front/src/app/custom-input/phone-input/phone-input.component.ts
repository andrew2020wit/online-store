import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomStringInputEvent } from '../model/custom-string-input.model';
import { getFormatPhoneNumber, patternPhoneNumber } from './phone-number-utils';

@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss'],
})
export class PhoneInputComponent implements OnInit {
  @Input() isRequired = false;
  @Input() label = 'Phone, like +38-099-123-1234';
  @Input() key: string;
  _initValue = '';
  @Input()
  set initValue(str: string) {
    if (str) {
      this._initValue = str;
      this.value = str;

      if (this._initValue) {
        this.setValue(this._initValue);
      }
    }
  }
  @Output() onChanged = new EventEmitter<CustomStringInputEvent>();

  value = '';
  isValid = false;
  isChanged = false;

  patternPhoneNumber = patternPhoneNumber;

  formValue = '+38-0';

  constructor() {}

  ngOnInit(): void {}

  onChange(event) {
    this.setValue(event.target.value);
  }

  setValue(value) {
    this.isValidCheck(value);
    if (this.isValid) {
      this.value = value.replace(/\D/g, '');
      //  console.log('this.value', this.value);
      this.formValue = getFormatPhoneNumber(this.value);
    }
    this.isChanged = this.value != this._initValue;
    this.onChanged.emit({
      value: this.value,
      isValid: this.isValid,
      key: this.key,
      isChanged: this.isChanged,
    });
  }

  isValidCheck(str) {
    this.isValid = this.patternPhoneNumber.test(str);
    //  console.log('this.isValid', this.isValid);
  }
}
