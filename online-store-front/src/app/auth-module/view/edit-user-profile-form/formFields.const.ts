import { FormControl, ValidationErrors } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { UserGender } from '../../user.entity';

export function phoneValidat2or(control: FormControl): ValidationErrors {
  return /([0-9]-?){10}/.test(control.value) ? null : { phone: true };
}

const phoneValidator = {
  expression: (c) => /^(\+?[0-9]-?){9,12}$/.test(c.value),
  message: 'phone number must be like +380-12-123-1234',
};

const emailValidator = {
  expression: (c) => /\S+@\S+\.\S+/.test(c.value),
  message: 'email must be like xx@rr.rr',
};

export const formFieldsUserEditProfile: FormlyFieldConfig[] = [
  {
    key: 'fullName',
    type: 'input',
    templateOptions: {
      label: 'fullName',
      placeholder: 'fullName (min 3 symbol)',
      required: true,
      minLength: 3,
      maxLength: 100,
    },
  },
  {
    key: 'defaultDeliverAddress',
    type: 'input',
    templateOptions: {
      label: 'defaultDeliverAddress',
      placeholder: 'defaultDeliverAddress, min 3 symbol',
      required: false,
      minLength: 3,
      maxLength: 1000,
    },
  },
  {
    key: 'phone',
    type: 'input',
    templateOptions: {
      label: 'phone',
      addonLeft: {
        icon: 'face',
      },
      placeholder: 'phone',
      required: true,
      minLength: 9,
      maxLength: 20,
    },
    validators: {
      phone: phoneValidator,
    },
  },
  {
    key: 'email',
    type: 'input',
    templateOptions: {
      label: 'email',
      placeholder: 'email',
      required: true,
      minLength: 3,
      maxLength: 1000,
    },
    validators: {
      phone: emailValidator,
    },
  },
  {
    key: 'language',
    type: 'input',
    templateOptions: {
      label: 'language',
      placeholder: 'language',
      required: false,
      minLength: 2,
      maxLength: 100,
    },
  },

  {
    key: 'gender',
    type: 'select',
    templateOptions: {
      label: 'gender',
      placeholder: 'gender',
      required: false,
      options: [
        { value: UserGender.notIndicated, label: 'notIndicated' },
        { value: UserGender.man, label: 'man' },
        { value: UserGender.woman, label: 'woman' },
      ],
    },
  },

  {
    key: 'birthday',
    type: 'datepicker',
    templateOptions: {
      label: 'birthday',
      required: false,
      placeholder: 'birthday',
    },
  },
];
