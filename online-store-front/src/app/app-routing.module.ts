import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ArticleViewEditComponent } from './articles/article-view-edit/article-view-edit.component';
import { CreateArticleComponent } from './articles/create-article/create-article.component';
import { AuthAdminGuard } from './auth-module/guards/auth-admin.guard';
import { AuthGuard } from './auth-module/guards/auth.guard';
import { AdminUserEditComponent } from './auth-module/view/admin-user-edit/admin-user-edit.component';
import { AdminUsersListComponent } from './auth-module/view/admin-users-list/users-list.component';
import { ServerTestToolsComponent } from './auth-module/view/server-test-tools/server-test-tools.component';
import { UserProfileComponent } from './auth-module/view/user-profile/user-profile.component';
import { UserRegisterFormComponent } from './auth-module/view/user-register-form/user-register-form.component';
import { AboutComponent } from './view/pages/about/about.component';
import { GoodsComponent } from './view/pages/goods/goods.component';
import { HomePageComponent } from './view/pages/home-page/home-page.component';
import { NewsComponent } from './view/pages/news/news.component';
import { NotFoundPageComponent } from './view/pages/not-found-page/not-found-page.component';
import { ReviewsComponent } from './view/pages/reviews/reviews.component';

const appRoutes: Routes = [
  { path: '', component: HomePageComponent },

  { path: 'goods', component: GoodsComponent },
  { path: 'news', component: NewsComponent },
  { path: 'review', component: ReviewsComponent },
  { path: 'about', component: AboutComponent },

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

  {
    path: 'admin/users',
    component: AdminUsersListComponent,
    canActivate: [AuthGuard, AuthAdminGuard],
  },
  {
    path: 'admin/user-edit/:id',
    component: AdminUserEditComponent,
    canActivate: [AuthGuard, AuthAdminGuard],
  },
  {
    path: 'admin/test-tools',
    component: ServerTestToolsComponent,
    canActivate: [AuthGuard, AuthAdminGuard],
  },
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
