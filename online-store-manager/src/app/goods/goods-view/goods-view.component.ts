import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import {
  baseApiUrl,
  bigNoPhotoUrlGlob,
} from '../../../environments/environment';
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
  goodsId: string;

  name: string;
  description: string;
  createdOn: Date;
  updatedOn: Date;
  bigPhotoUrl = '';
  price = null;

  photoUrl = baseApiUrl + bigNoPhotoUrlGlob;

  constructor(
    private apollo: Apollo,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {
    this.goodsId = this.activateRoute.snapshot.params['id'];
    if (this.bigPhotoUrl !== '') {
      this.photoUrl = this.bigPhotoUrl;
    }
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
      });
  }
}
