import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { smallNoPhotoUrlGlob } from '../../../environments/environment';
import { baseApiUrl } from './../../../environments/environment';

@Component({
  selector: 'app-goods-card',
  templateUrl: './goods-card.component.html',
  styleUrls: ['./goods-card.component.scss'],
})
export class GoodsCardComponent implements OnInit {
  @Input() name = 'no name !!!';
  @Input() id = '';
  @Input() description = 'no description';
  @Input() smallPhotoUrl = '';
  @Input() price = null;
  @Input() createdOn: Date;
  @Input() updatedOn: Date;

  photoUrl = baseApiUrl + smallNoPhotoUrlGlob;

  shortTitle = '';
  maxTitleLength = 20;

  constructor(private router: Router) {
    if (this.smallPhotoUrl !== '') {
      this.photoUrl = this.smallPhotoUrl;
    }
  }

  ngOnInit(): void {
    if (this.name.length <= this.maxTitleLength) {
      this.shortTitle = this.name;
    } else {
      this.shortTitle = this.name.slice(0, this.maxTitleLength) + '...';
    }
  }

  go() {
    this.router.navigate(['/goods-details-view', this.id]);
  }
}
