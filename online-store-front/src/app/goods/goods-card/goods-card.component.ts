import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-goods-card',
  templateUrl: './goods-card.component.html',
  styleUrls: ['./goods-card.component.scss'],
})
export class GoodsCardComponent implements OnInit {
  @Input() name = 'no name !!!';
  @Input() id = '';
  @Input() description = 'no description';
  @Input() createdOn: Date;
  @Input() updatedOn: Date;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  go() {
    this.router.navigate(['/goods-details-view', this.id]);
  }
}
