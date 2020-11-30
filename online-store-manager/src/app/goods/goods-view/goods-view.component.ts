import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoodsEntity } from './../goods.entity';
import { GoodsService } from './../goods.service';
@Component({
  selector: 'app-goods-view',
  templateUrl: './goods-view.component.html',
  styleUrls: ['./goods-view.component.scss'],
})
export class GoodsViewComponent {
  entity: GoodsEntity;
  routerId: string;

  constructor(
    private entityService: GoodsService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {
    this.routerId = this.activateRoute.snapshot.params['id'];
    this.getEntity();
  }

  ngOnInit(): void {}

  getEntity() {
    this.entityService.getById(this.routerId).subscribe((entity) => {
      this.entity = entity;
    });
  }
  edit() {
    this.router.navigate([`/edit-goods/${this.routerId}`]);
  }
}
