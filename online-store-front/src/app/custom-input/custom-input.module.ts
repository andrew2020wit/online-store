import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExternalShareModule } from './../share/external-share.module';
import { MaterialShareModule } from './../share/material-share.module';
import { PhoneInputComponent } from './phone-input/phone-input.component';

const exportModule = [PhoneInputComponent];

@NgModule({
  declarations: [...exportModule],
  imports: [CommonModule, MaterialShareModule, ExternalShareModule],
  exports: exportModule,
})
export class CustomInputModule {}
