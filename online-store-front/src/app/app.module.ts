import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth-module/auth.module';
import { errorInterceptorProvider } from './auth-module/interceptors/errors.interceptor';
import { jwtInterceptorProvider } from './auth-module/interceptors/jwt.interceptor';
import { GoodsModule } from './goods/goods.module';
import { OrderModule } from './order/order.module';
import { ExternalShareModule } from './share/external-share.module';
import { InternalShareModule } from './share/internal-share.module';
import { MaterialShareModule } from './share/material-share.module';
import { ViewModule } from './view/view.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    ArticlesModule,
    AuthModule,
    ViewModule,
    LayoutModule,
    ExternalShareModule,
    GoodsModule,
    OrderModule,
    MaterialShareModule,
    InternalShareModule,
  ],
  providers: [errorInterceptorProvider, jwtInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
