import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomStringInputEvent } from '../model/custom-string-input.model';
import { EnumItem } from '../model/enum-input.model';

@Component({
  selector: 'app-enum-input',
  templateUrl: './enum-input.component.html',
  styleUrls: ['./enum-input.component.scss'],
})
export class EnumInputComponent implements OnInit {
  @Input() isRequired = false;
  @Input() label = '';
  @Input() key: string;
  @Input() values: EnumItem[];
  _initValue = '';
  @Input()
  set initValue(str: string) {
    if (str) {
      this._initValue = str;
      this.value = str;

      this.onChange();
    }
  }

  @Output() onChanged = new EventEmitter<CustomStringInputEvent>();

  value = '';

  isChanged = false;
  constructor() {}

  ngOnInit(): void {}

  onChange() {
    this.isChanged = this.value != this._initValue;
    // console.log('EnumInputComponent', {
    //   value: this.value,
    //   isValid: !!this.value,
    //   isChanged: this.isChanged,
    //   key: this.init.key,
    // });

    this.onChanged.emit({
      value: this.value,
      isValid: !!this.value,
      isChanged: this.isChanged,
      key: this.key,
    });
  }
}
