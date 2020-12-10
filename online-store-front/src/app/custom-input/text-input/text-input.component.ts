import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomStringInputEvent } from '../custom-input.module';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements OnInit {
  @Input() key = '';
  @Input() initValue = '';
  @Input() minlength = 2;
  @Input() label = 'Text';
  @Input() isRequired = false;
  @Output() onChanged = new EventEmitter<CustomStringInputEvent>();

  value = '';
  isValid = false;
  placeholder = '';

  constructor() {}

  ngOnInit(): void {
    if (this.minlength) {
      this.label = this.label + ` min ${this.minlength} symbols`;
    }
    if (this.initValue) {
      this.value = this.initValue;
      this.isValidCheck();
    }
  }

  onChange(event) {
    this.isValidCheck();
    console.log('onChange');
  }

  isValidCheck() {
    this.isValid = this.value.length >= this.minlength;
    this.onChanged.emit({
      value: this.value,
      isValid: this.isValid,
      key: this.key,
    });
  }
}
