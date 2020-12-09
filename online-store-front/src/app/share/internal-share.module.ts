import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { CustomInputModule } from '../custom-input/custom-input.module';

const customModules = [AppRoutingModule, CustomInputModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...customModules],
  exports: [...customModules],
})
export class InternalShareModule {}
