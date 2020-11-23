import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
  @Input() label = 'label';
  @Input() apiEndpoint = '';
  @Input() newFileName = 'noname';
  @Input() accept = '*'; // accept="file_extension|audio/*|video/*|image/*|media_type"
  @Output() onDone = new EventEmitter<boolean>();

  upLoading = false;
  upLoadedMes = '';
  fileToUpload: File = null;

  constructor(private httpClient: HttpClient) {}

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  uploadFileToServer() {
    if (this.upLoading) {
      return;
    }
    this.upLoading = true;

    // const newFileName =
    //   this.itemId + '-' + this.itemType + '-' + this.fileToUpload.name;

    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);

    this.httpClient.post(this.apiEndpoint, formData).subscribe(
      (res) => {
        console.log('res:', res);
        // const newUrl = this.baseImgUrl + newFileName;
        this.onDone.emit(true);
        this.upLoadedMes = 'Successfully uploaded!';
      },
      (error) => {
        this.onDone.emit(false);
        console.error('uploadFileToServer: ', error);
      }
    );
    this.upLoading = false;
    this.fileToUpload = null;
  }
}
