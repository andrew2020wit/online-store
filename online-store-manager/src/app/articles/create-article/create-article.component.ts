import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticlesService } from './../articles.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
})
export class CreateArticleComponent implements OnInit {
  @Input() initArticleId = '';
  @Input() initTitle = '';
  @Input() initDescription = '';
  @Input() initText = '';
  createArticleForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private articleService: ArticlesService
  ) {
    this.createArticleForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      text: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.initArticleId = this.initArticleId.trim();
    if (!this.initArticleId) {
      return;
    }
    this.createArticleForm.get('title').setValue(this.initTitle);
    this.createArticleForm.get('description').setValue(this.initDescription);
    this.createArticleForm.get('text').setValue(this.initText);
  }
  send() {
    const title = this.createArticleForm.get('title').value;
    const description = this.createArticleForm.get('description').value;
    const text = this.createArticleForm.get('text').value;

    if (this.initArticleId) {
      this.articleService
        .editArticle$(this.initArticleId, title, description, text)
        .subscribe((x) => console.log('the article edited', x));
      document.location.reload();
    } else {
      this.articleService
        .createArticle$(title, description, text)
        .subscribe((x) => console.log('the article created: ', x));
      this.router.navigate(['']);
    }
  }
}
