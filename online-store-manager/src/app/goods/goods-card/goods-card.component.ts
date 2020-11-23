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

  smallPhotoUrlFact = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.smallPhotoUrl !== '') {
      this.smallPhotoUrlFact = baseApiUrl + this.smallPhotoUrl;
    } else {
      this.smallPhotoUrlFact = baseApiUrl + smallNoPhotoUrlGlob;
    }
  }

  go() {
    this.router.navigate(['/goods-details-view', this.id]);
  }
}
