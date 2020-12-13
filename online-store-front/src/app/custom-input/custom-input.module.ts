import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExternalShareModule } from './../share/external-share.module';
import { MaterialShareModule } from './../share/material-share.module';
import { EnumInputComponent } from './enum-input/enum-input.component';
import { PhoneInputComponent } from './phone-input/phone-input.component';
import { SinglePasswordComponent } from './single-password/single-password.component';
import { TextInputComponent } from './text-input/text-input.component';
import { WPasswordComponent } from './w-password/w-password.component';

const exportModule = [
  PhoneInputComponent,
  TextInputComponent,
  WPasswordComponent,
  EnumInputComponent,
  SinglePasswordComponent,
];

@NgModule({
  declarations: [...exportModule],
  imports: [CommonModule, MaterialShareModule, ExternalShareModule],
  exports: exportModule,
})
export class CustomInputModule {}
