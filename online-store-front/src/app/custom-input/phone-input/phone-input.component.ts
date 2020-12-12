import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  CustomStringInputEvent,
  CustomStringInputModel,
} from '../model/custom-string-input.model';
import { getFormatPhoneNumber, patternPhoneNumber } from './phone-number-utils';

@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss'],
})
export class PhoneInputComponent implements OnInit, DoCheck {
  @Input() init: CustomStringInputModel;
  @Output() onChanged = new EventEmitter<CustomStringInputEvent>();

  label = 'Phone, like +38-099-123-1234';

  value = '';
  isValid = false;
  isChanged = false;

  patternPhoneNumber = patternPhoneNumber;

  formValue = '+38-0';

  constructor() {}

  ngOnInit(): void {}

  ngDoCheck() {
    if (this.init.initValue) {
      this.setValue(this.init.initValue);
    }
  }

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
    this.isChanged = this.value != this.init.initValue;
    this.onChanged.emit({
      value: this.value,
      isValid: this.isValid,
      key: this.init.key,
      isChanged: this.isChanged,
    });
  }

  isValidCheck(str) {
    this.isValid = this.patternPhoneNumber.test(str);
    //  console.log('this.isValid', this.isValid);
  }
}
