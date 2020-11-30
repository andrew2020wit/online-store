import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { baseApiUrl } from '../../../environments/environment';
import { formFieldsGoodsEdit } from '../formFields.const';
import { GoodsEntity } from './../goods.entity';
import { GoodsService } from './../goods.service';

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

  goodsId: string;

  createdOn: Date;
  updatedOn: Date;

  bigPhotoUrl = '';
  smallPhotoUrl = '';

  bigApiEndpoint = '';
  smallApiEndpoint = '';

  constructor(
    private service: GoodsService,
    private activateRoute: ActivatedRoute
  ) {
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

    this.service.getById(this.goodsId).subscribe((goods1) => {
      const formModel1 = new FormModel();

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

    const newGoods: GoodsEntity = {
      id: this.goodsId,
      name: this.formModel.name,
      description: this.formModel.description,
      smallPhotoUrl: this.formModel.smallPhotoUrl,
      bigPhotoUrl: this.formModel.bigPhotoUrl,
      price: this.formModel.price,
    };
    this.service.edit$(newGoods).subscribe((x) => {
      console.log('service.edit', x);
    });
  }

  create() {
    if (this.goodsId) {
      return;
    }
    const newGoods: GoodsEntity = {
      name: this.formModel.name,
      description: this.formModel.description,
      smallPhotoUrl: this.formModel.smallPhotoUrl,
      bigPhotoUrl: this.formModel.bigPhotoUrl,
      price: this.formModel.price,
    };
    this.service.create$(newGoods).subscribe((x) => {
      console.log('service.create', x);
    });
  }

  disActivate() {
    this.service.activate$(this.goodsId, false).subscribe((x) => {
      console.log('service.create', x);
    });
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
