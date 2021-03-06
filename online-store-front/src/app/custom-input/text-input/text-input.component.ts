import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomStringInputEvent } from '../model/custom-string-input.model';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements OnInit {
  @Input() isRequired = false;
  @Input() label = '';
  @Input() key: string;
  _initValue = '';
  @Input()
  set initValue(str: string) {
    if (str) {
      this._initValue = str;
      this.value = str;

      this.isValidCheck();
    }
  }

  @Output() onChanged = new EventEmitter<CustomStringInputEvent>();

  minlength = 2;

  value = '';

  isValid = false;
  isChanged = false;

  constructor() {}

  ngOnInit(): void {
    this.label = this.label + ` min ${this.minlength} symbols`;
  }

  onChange(event) {
    this.isValidCheck();
  }

  isValidCheck() {
    this.isValid = this.value.length >= this.minlength;
    this.isChanged = this.value != this._initValue;
    this.onChanged.emit({
      value: this.value,
      isValid: this.isValid,
      isChanged: this.isChanged,
      key: this.key,
    });
  }
}
