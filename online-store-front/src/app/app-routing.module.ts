import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ArticleViewEditComponent } from './articles/article-view-edit/article-view-edit.component';
import { CreateArticleComponent } from './articles/create-article/create-article.component';
import { AuthGuard } from './auth-module/auth.guard';
import { UserProfileComponent } from './auth-module/view/user-profile/user-profile.component';
import { UserRegisterFormComponent } from './auth-module/view/user-register-form/user-register-form.component';
import { AboutComponent } from './view/pages/about/about.component';
import { HomePageComponent } from './view/pages/home-page/home-page.component';
import { NotFoundPageComponent } from './view/pages/not-found-page/not-found-page.component';

const appRoutes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'article-view/:id', component: ArticleViewEditComponent },
  {
    path: 'create-article',
    component: CreateArticleComponent,
    canActivate: [AuthGuard],
  },
  { path: 'new-user', component: UserRegisterFormComponent },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  { path: 'about', component: AboutComponent },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
