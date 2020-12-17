import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { CustomInputModule } from '../custom-input/custom-input.module';
import { UtcToLocalTimePipe } from '../utils/utc-to-localtime.pipe';

const customModules = [AppRoutingModule, CustomInputModule];

@NgModule({
  declarations: [UtcToLocalTimePipe],
  imports: [CommonModule, ...customModules],
  exports: [...customModules, UtcToLocalTimePipe],
})
export class InternalShareModule {}
