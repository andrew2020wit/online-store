import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import {
  baseApiUrl,
  bigNoPhotoUrlGlob,
} from '../../../environments/environment';
import { IGoods } from './../goods.interface';
import { GoodsOneGQL } from './../GoodsOneGQL.const';

@Component({
  selector: 'app-goods-view',
  templateUrl: './goods-view.component.html',
  styleUrls: ['./goods-view.component.scss'],
})
export class GoodsViewComponent {
  GoodsWatchQuery: QueryRef<any>;
  goodsId: string;

  editGoodsLink = '#';

  name: string;
  description: string;
  createdOn: Date;
  updatedOn: Date;
  bigPhotoUrl = '';
  price = null;

  bigPhotoUrlFact = '';

  constructor(private apollo: Apollo, private activateRoute: ActivatedRoute) {
    this.goodsId = this.activateRoute.snapshot.params['id'];
    this.editGoodsLink = '/goods-edit/' + this.goodsId;

    // if (this.bigPhotoUrl !== '') {
    //   this.bigPhotoUrlFact = this.bigPhotoUrl;
    // }
  }

  ngOnInit(): void {
    this.apollo
      .watchQuery<any>({
        query: GoodsOneGQL,
        variables: {
          id: this.goodsId,
        },
      })
      .valueChanges.subscribe(({ data, loading }) => {
        const goods1 = data.getOneGoods as IGoods;
        this.name = goods1.name;
        this.description = goods1.description;
        this.createdOn = goods1.createdOn;
        this.updatedOn = goods1.updatedOn;
        this.bigPhotoUrl = goods1.bigPhotoUrl;
        this.price = goods1.price;

        if (this.bigPhotoUrl !== '') {
          this.bigPhotoUrlFact = baseApiUrl + this.bigPhotoUrl;
        } else {
          this.bigPhotoUrlFact = baseApiUrl + bigNoPhotoUrlGlob;
        }
      });
  }
}
