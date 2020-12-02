import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ArticleEntity } from './../article.entity';
import { ArticlesService } from './../articles.service';
import { formFieldsArticleEdit } from './formFields.const';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss'],
})
export class EditArticleComponent implements OnInit {
  routeId: string;

  form = new FormGroup({});
  formModel: ArticleEntity;
  formFields = formFieldsArticleEdit;

  constructor(
    private activateRoute: ActivatedRoute,
    private entityService: ArticlesService
  ) {
    this.setEmptyValues();
    this.routeId = this.activateRoute.snapshot.params['id'];
    if (this.routeId) {
      this.fetchEntity(this.routeId);
    }
  }

  ngOnInit(): void {}

  setEmptyValues() {
    const formModelTemp = new ArticleEntity();
    formModelTemp.isActive = true;
    formModelTemp.text = '';
    formModelTemp.title = '';
    formModelTemp.description = '';
    if (!this.routeId) {
      formModelTemp.id = this.routeId;
    }
    this.formModel = formModelTemp;
  }

  fetchEntity(id: string) {
    this.entityService.getById(id).subscribe((x) => {
      const newFormModel = new ArticleEntity();
      newFormModel.articleType = x.articleType;
      newFormModel.description = x.description;
      newFormModel.isActive = x.isActive;
      newFormModel.text = x.text;
      newFormModel.title = x.title;
      newFormModel.id = x.id;
      this.formModel = newFormModel;
    });
  }

  sendEntity() {
    this.entityService.edit$(this.formModel).subscribe((x) => {
      console.log('sendEntity', x);
    });
  }
}
