import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShareModule } from './../../share.module';
import { UploadComponent } from './upload.component';

@NgModule({
  declarations: [UploadComponent],
  exports: [UploadComponent],
  imports: [CommonModule, ShareModule],
})
export class UploadModule {}
