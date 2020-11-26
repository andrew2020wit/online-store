import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { bigNoPhotoUrlGlob } from '../../../environments/environment';
import { baseApiUrl } from './../../../environments/environment';
import { IGoods } from './../goods.interface';

const GoodsOneGQL = gql`
  query getOneGoods($id: String!) {
    getOneGoods(id: $id) {
      id
      name
      description
      createdOn
      updatedOn
      bigPhotoUrl
      price
    }
  }
`;

@Component({
  selector: 'app-goods-view',
  templateUrl: './goods-view.component.html',
  styleUrls: ['./goods-view.component.scss'],
})
export class GoodsViewComponent {
  GoodsWatchQuery: QueryRef<any>;
  goods: IGoods;
  routerId: string;

  constructor(private apollo: Apollo, private activateRoute: ActivatedRoute) {
    this.routerId = this.activateRoute.snapshot.params['id'];
    this.getGoods();
  }

  ngOnInit(): void {}

  getGoods() {
    this.apollo
      .watchQuery<any>({
        query: GoodsOneGQL,
        variables: {
          id: this.routerId,
        },
      })
      .valueChanges.subscribe(({ data, loading }) => {
        const goods1 = data.getOneGoods as IGoods;

        const goodsTemp: IGoods = {
          name: goods1.name,
          description: goods1.description,
          createdOn: goods1.createdOn,
          updatedOn: goods1.updatedOn,
          bigPhotoUrl: goods1.bigPhotoUrl,
          price: goods1.price,
        };
        if (goodsTemp.bigPhotoUrl == '') {
          goodsTemp.bigPhotoUrl = bigNoPhotoUrlGlob;
          goodsTemp.bigPhotoUrl = baseApiUrl + goodsTemp.bigPhotoUrl;
        } else {
          goodsTemp.bigPhotoUrl = baseApiUrl + goodsTemp.bigPhotoUrl;
        }
        goodsTemp.id = this.routerId;
        this.goods = goodsTemp;
      });
  }
}
