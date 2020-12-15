import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ArticleViewComponent } from './articles/article-view/article-view.component';
import { ArticlesPageComponent } from './articles/articles-page/articles-page.component';
import { EditArticleComponent } from './articles/edit-article/edit-article.component';
import { AuthAdminGuard } from './auth-module/guards/auth-admin.guard';
import { AuthGuard } from './auth-module/guards/auth.guard';
import { AdminUserEditComponent } from './auth-module/view/admin-user-edit/admin-user-edit.component';
import { AdminUsersListComponent } from './auth-module/view/admin-users-list/users-list.component';
import { LoginPageComponent } from './auth-module/view/login-page/login-page.component';
import { ServerTestToolsComponent } from './auth-module/view/server-test-tools/server-test-tools.component';
import { UserProfileComponent } from './auth-module/view/user-profile/user-profile.component';
import { UserRegisterFormComponent } from './auth-module/view/user-register-form/user-register-form.component';
import { GoodsEditComponent } from './goods/goods-edit/goods-edit.component';
import { GoodsViewComponent } from './goods/goods-view/goods-view.component';
import { AboutComponent } from './view/pages/about/about.component';
import { GoodsComponent } from './view/pages/goods/goods.component';
import { HomePageComponent } from './view/pages/home-page/home-page.component';
import { NotFoundPageComponent } from './view/pages/not-found-page/not-found-page.component';

const appRoutes: Routes = [
  { path: '', component: HomePageComponent },

  { path: 'goods', component: GoodsComponent, canActivate: [AuthGuard] },
  {
    path: 'goods-details-view/:id',
    component: GoodsViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-goods/:id',
    component: GoodsEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-goods',
    component: GoodsEditComponent,
    canActivate: [AuthGuard],
  },
  { path: 'about', component: AboutComponent },

  { path: 'login-page', component: LoginPageComponent },

  { path: 'article-view/:id', component: ArticleViewComponent },
  { path: 'article-list', component: ArticlesPageComponent },
  {
    path: 'edit-article/:id',
    component: EditArticleComponent,
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
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
