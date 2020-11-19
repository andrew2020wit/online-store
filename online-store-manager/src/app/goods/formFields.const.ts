import { FormlyFieldConfig } from '@ngx-formly/core';

export const formFieldsGoodsEdit: FormlyFieldConfig[] = [
  {
    key: 'name',
    type: 'input',
    templateOptions: {
      label: 'Name of goods',
      placeholder: 'Name of goods',
      required: true,
      minLength: 3,
      maxLength: 256,
    },
  },
  {
    key: 'bigPhotoUrl',
    type: 'input',
    templateOptions: {
      label: 'bigPhotoUrl',
      placeholder: 'bigPhotoUrl',
      maxLength: 256,
    },
  },
  {
    key: 'smallPhotoUrl',
    type: 'input',
    templateOptions: {
      label: 'smallPhotoUrl',
      placeholder: 'smallPhotoUrl',
      maxLength: 256,
    },
  },
  {
    key: 'price',
    type: 'input',
    templateOptions: {
      type: 'number',
      label: 'price',
      placeholder: 'price',
      max: 1000000000,
    },
  },

  {
    key: 'description',
    type: 'textarea',
    templateOptions: {
      label: 'description',
      placeholder: 'description, maxLength: 5000',
      rows: 5,
      maxLength: 5000,
    },
  },
];
