import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { Connection } from 'typeorm';
import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './auth/users/users.module';
import { GoodsModule } from './goods/goods.module';
import { OrdersModule } from './orders/orders.module';
import { InitTestDataService } from './testing/init-test-data/init-test-data.service';
import { TestController } from './testing/test.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*', '/graphql*'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    ArticlesModule,
    UsersModule,
    ArticlesModule,
    GoodsModule,
    OrdersModule,
  ],
  providers: [InitTestDataService],
  controllers: [TestController],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
