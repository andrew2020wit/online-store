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

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements OnInit, DoCheck {
  @Input() init: CustomStringInputModel;

  @Output() onChanged = new EventEmitter<CustomStringInputEvent>();

  minlength = 2;

  label = '';

  value = '';

  isValid = false;
  isChanged = false;

  constructor() {}

  ngOnInit(): void {
    this.label = this.init.label + ` min ${this.minlength} symbols`;
  }
  ngDoCheck() {
    if (this.init.initValue) {
      this.value = this.init.initValue;
      this.isValidCheck();
    }
  }

  onChange(event) {
    this.isValidCheck();
  }

  isValidCheck() {
    this.isValid = this.value.length >= this.minlength;
    this.isChanged = this.value != this.init.initValue;
    this.onChanged.emit({
      value: this.value,
      isValid: this.isValid,
      isChanged: this.isChanged,
      key: this.init.key,
    });
  }
}
