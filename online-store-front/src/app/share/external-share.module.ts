// imports/exports MaterialModules
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';

const externalModules = [
  FormlyMaterialModule,
  FormlyMatDatepickerModule,
  BrowserAnimationsModule,
  HttpClientModule,
  ReactiveFormsModule,
  BrowserModule,
  FormsModule,
];

@NgModule({
  imports: [
    ...externalModules,
    FormlyModule.forRoot({
      extras: { lazyRender: true },
      validationMessages: [
        { name: 'required', message: 'This field is required!' },
        { name: 'minlength', message: 'need more long' },
        { name: 'maxlength', message: 'it is to long' },
        { name: 'min', message: 'it must be bigger' },
        { name: 'max', message: 'it is to bigger' },
      ],
    }),
  ],
  exports: [...externalModules, FormlyModule],
  declarations: [],
})
export class ExternalShareModule {}
