import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import { baseApiUrl } from '../../../environments/environment';
import { formFieldsGoodsEdit } from '../formFields.const';
import { IGoods } from '../goods.interface';
import {
  CreateGoodsGQL,
  DisActiveGoodsGQL,
  EditGoodsGQL,
  GoodsOneGQL,
} from '../GoodsOneGQL.const';

class FormModel {
  name = '';
  description = '';
  price = null;
  bigPhotoUrl = '';
  smallPhotoUrl = '';
}

@Component({
  selector: 'app-goods-edit',
  templateUrl: './goods-edit.component.html',
  styleUrls: ['./goods-edit.component.scss'],
})
export class GoodsEditComponent implements OnInit {
  form = new FormGroup({});
  formModel = new FormModel();
  formFields = formFieldsGoodsEdit;

  GoodsWatchQuery: QueryRef<any>;
  goodsId: string;

  createdOn: Date;
  updatedOn: Date;

  bigPhotoUrl = '';
  smallPhotoUrl = '';

  bigApiEndpoint = '';
  smallApiEndpoint = '';

  constructor(private apollo: Apollo, private activateRoute: ActivatedRoute) {
    this.goodsId = this.activateRoute.snapshot.params['id'];
    this.bigApiEndpoint =
      baseApiUrl + '/goods/photo-upload/' + 'bigPhotoUrl/' + this.goodsId;
    this.smallApiEndpoint =
      baseApiUrl + '/goods/photo-upload/' + 'smallPhotoUrl/' + this.goodsId;

    this.loadGoodsProperty();
  }

  ngOnInit(): void {}

  loadGoodsProperty() {
    if (!this.goodsId) {
      console.log('no goodsId');
      return;
    }
    this.apollo
      .watchQuery<any>({
        query: GoodsOneGQL,
        variables: {
          id: this.goodsId,
        },
      })
      .valueChanges.subscribe(({ data, loading }) => {
        const formModel1 = new FormModel();
        const goods1 = data.getOneGoods as IGoods;
        console.log('goods1', goods1);

        formModel1.name = goods1.name;
        formModel1.description = goods1.description;
        formModel1.price = goods1.price;
        formModel1.smallPhotoUrl = goods1.smallPhotoUrl;
        formModel1.bigPhotoUrl = goods1.bigPhotoUrl;

        this.formModel = formModel1;

        this.createdOn = goods1.createdOn;
        this.updatedOn = goods1.updatedOn;
        this.bigPhotoUrl = baseApiUrl + this.formModel.bigPhotoUrl;
        this.smallPhotoUrl = baseApiUrl + this.formModel.smallPhotoUrl;
      });
  }

  edit() {
    if (!this.goodsId) {
      return;
    }
    this.apollo
      .mutate({
        mutation: EditGoodsGQL,
        variables: {
          id: this.goodsId,
          name: this.formModel.name,
          description: this.formModel.description,
          smallPhotoUrl: this.formModel.smallPhotoUrl,
          bigPhotoUrl: this.formModel.bigPhotoUrl,
          price: this.formModel.price,
        },
      })
      .subscribe((x) => console.log(x));
  }

  create() {
    if (this.goodsId) {
      return;
    }
    this.apollo
      .mutate({
        mutation: CreateGoodsGQL,
        variables: {
          name: this.formModel.name,
          description: this.formModel.description,
          smallPhotoUrl: this.formModel.smallPhotoUrl,
          bigPhotoUrl: this.formModel.bigPhotoUrl,
          price: this.formModel.price,
        },
      })
      .subscribe((x) => console.log(x));
  }

  disActivate() {
    if (!this.goodsId) {
      return;
    }
    this.apollo
      .mutate({
        mutation: DisActiveGoodsGQL,
        variables: { goodsId: this.goodsId },
      })
      .subscribe((x) => console.log(x));
  }

  doneBigImgUpload(isOk) {
    if (!isOk) {
      return;
    }
    console.log('img upload', isOk);
  }
  doneSmallImgUpload(isOk) {
    if (!isOk) {
      return;
    }
    console.log('img upload', isOk);
  }
}
