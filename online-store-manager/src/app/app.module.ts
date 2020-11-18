import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth-module/auth.module';
import { errorInterceptorProvider } from './auth-module/interceptors/errors.interceptor';
import { jwtInterceptorProvider } from './auth-module/interceptors/jwt.interceptor';
import { GoodsModule } from './goods/goods.module';
import { ManagerModule } from './manager-module/manager.module';
import { ShareModule } from './share.module';
import { ViewModule } from './view/view.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    ArticlesModule,
    AuthModule,
    ViewModule,
    LayoutModule,
    ShareModule,
    HttpClientModule,
    GoodsModule,
    ManagerModule,
  ],
  providers: [errorInterceptorProvider, jwtInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
