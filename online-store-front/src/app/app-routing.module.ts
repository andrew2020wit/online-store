import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ArticleViewComponent } from './articles/article-view/article-view.component';
import { NewsPageComponent } from './articles/news-page/news-page.component';
import { ReviewsPageComponent } from './articles/reviews-page/reviews-page.component';
import { AuthGuard } from './auth-module/guards/auth.guard';
import { EditUserProfilePageComponent } from './auth-module/view/edit-user-profile-page/edit-user-profile-page.component';
import { UserRegisterPageComponent } from './auth-module/view/user-register-page/user-register-page.component';
import { GoodsPageComponent } from './goods/goods-page/goods-page.component';
import { GoodsViewComponent } from './goods/goods-view/goods-view.component';
import { OrdersListComponent } from './order/orders-list/orders-list.component';
import { AboutComponent } from './view/pages/about/about.component';
import { HomePageComponent } from './view/pages/home-page/home-page.component';
import { NotFoundPageComponent } from './view/pages/not-found-page/not-found-page.component';

const appRoutes: Routes = [
  { path: '', component: HomePageComponent },

  { path: 'goods', component: GoodsPageComponent },
  { path: 'goods-details-view/:id', component: GoodsViewComponent },
  {
    path: 'orders-list',
    component: OrdersListComponent,
    canActivate: [AuthGuard],
  },

  { path: 'news', component: NewsPageComponent },
  { path: 'review', component: ReviewsPageComponent },
  { path: 'article-view/:id', component: ArticleViewComponent },

  { path: 'about', component: AboutComponent },

  { path: 'user-register', component: UserRegisterPageComponent },
  {
    path: 'edit-user-profile',
    component: EditUserProfilePageComponent,
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
