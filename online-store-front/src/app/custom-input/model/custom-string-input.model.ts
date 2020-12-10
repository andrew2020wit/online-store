export class CustomStringInputEvent {
  key: string;
  value: string;
  isValid: boolean;
  isChanged?: boolean;
}

export class CustomStringInputModel {
  key: string;
  label: string;
  initValue: string;
  isRequired: boolean;
  value: string;
  isChanged: boolean;
  isValid: boolean;
  constructor(key: string, initValue?: string) {
    this.key = key;
    this.label = key;
    if (initValue) {
      this.initValue = initValue;
    } else {
      this.initValue = '';
    }
    this.isRequired = false;
    this.value = this.initValue;
    this.isChanged = false;
    this.isValid = !!initValue;
  }
}
