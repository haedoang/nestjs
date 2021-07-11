import { MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import * as dotenv from 'dotenv';
import { CountMiddleware } from './common/middleware/count.middleware';
import { HandlebarsModule } from './handlebars/handlebars.module';
import { User } from './db/user/users.entitiy';
import { UserModule } from './db/user/user.module';
dotenv.config({});

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type : 'mysql',
      host : process.env.MYSQL_HOST,
      port : Number(process.env.MYSQL_PORT),
      username : process.env.MYSQL_USER,
      password : process.env.MYSQL_PASS,
      database : process.env.MYSQL_DATABASE,
      entities : [User],
      logging : true
      //synchronize : false
    }),
    HandlebarsModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CountMiddleware)
      .forRoutes();
  }

}
