import { FormlyFieldConfig } from '@ngx-formly/core';
import { articleTypes } from '../article.entity';

// formModelTemp.articleType = '';
// formModelTemp.isActive = true;
// formModelTemp.text = '';
// formModelTemp.title = '';
// formModelTemp.description = '';

export const formFieldsArticleEdit: FormlyFieldConfig[] = [
  {
    key: 'title',
    type: 'input',
    templateOptions: {
      label: 'title',
      placeholder: 'title',
      required: true,
      minLength: 3,
      maxLength: 256,
    },
  },
  {
    key: 'articleType',
    type: 'select',
    templateOptions: {
      label: 'articleType',
      placeholder: 'articleType',
      description: 'articleType',
      required: true,
      options: [
        { value: articleTypes.article, label: 'Article' },
        { value: articleTypes.news, label: 'News' },
        { value: articleTypes.review, label: 'Review' },
      ],
    },
  },
  {
    key: 'description',
    type: 'textarea',
    templateOptions: {
      label: 'description',
      placeholder: 'description, maxLength: 1000',
      rows: 5,
      maxLength: 1000,
    },
  },
  {
    key: 'text',
    type: 'textarea',
    templateOptions: {
      label: 'text',
      placeholder: 'text, maxLength: 5000',
      rows: 5,
      maxLength: 5000,
    },
  },
  {
    key: 'isActive',
    type: 'checkbox',
    templateOptions: {
      label: 'isActives',
      description: 'isActive',
      required: true,
    },
  },
];
