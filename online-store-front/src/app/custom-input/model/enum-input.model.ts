export class EnumItem {
  value: string;
  viewValue: string;
}

export class EnumInputModel {
  key: string;
  values: EnumItem[];
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
    this.values = [];
  }
}
