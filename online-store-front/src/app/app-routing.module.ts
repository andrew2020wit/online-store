import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ArticleViewEditComponent } from './articles/article-view-edit/article-view-edit.component';
import { AuthGuard } from './auth-module/guards/auth.guard';
import { LoginPageComponent } from './auth-module/view/login-page/login-page.component';
import { UserProfileComponent } from './auth-module/view/user-profile/user-profile.component';
import { UserRegisterFormComponent } from './auth-module/view/user-register-form/user-register-form.component';
import { GoodsViewComponent } from './goods/goods-view/goods-view.component';
import { AboutComponent } from './view/pages/about/about.component';
import { GoodsComponent } from './view/pages/goods/goods.component';
import { HomePageComponent } from './view/pages/home-page/home-page.component';
import { NewsComponent } from './view/pages/news/news.component';
import { NotFoundPageComponent } from './view/pages/not-found-page/not-found-page.component';
import { ReviewsComponent } from './view/pages/reviews/reviews.component';

const appRoutes: Routes = [
  { path: '', component: HomePageComponent },

  { path: 'goods', component: GoodsComponent },
  { path: 'goods-details-view/:id', component: GoodsViewComponent },
  { path: 'news', component: NewsComponent },
  { path: 'review', component: ReviewsComponent },
  { path: 'about', component: AboutComponent },

  { path: 'login-page', component: LoginPageComponent },

  { path: 'article-view/:id', component: ArticleViewEditComponent },

  { path: 'new-user', component: UserRegisterFormComponent },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },

  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
