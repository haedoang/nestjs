import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
dotenv.config({});


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{
    httpsOptions : 
      process.env.NODE_ENV === "production" ? 
      {
          key : fs.readFileSync('/installpgm/selfsignssl/haedoang.cf.key'),
          cert : fs.readFileSync('/installpgm/selfsignssl/haedoang.cf.crt'),
          ca : fs.readFileSync('/installpgm/selfsignssl/haedoang.cf.csr')
      }
        : 
      {
        key : fs.readFileSync('/Users/haedoang/certification/2021/haedoang.cf.key'),
          cert : fs.readFileSync('/Users/haedoang/certification/2021/haedoang.cf.crt'),
          ca : fs.readFileSync('/Users/haedoang/certification/2021/haedoang.cf.csr')
      }
  });
  
  //cookie
  app.use(
    session({
      secret : process.env.COOKIE_SECRET,
      resave : false,       // 
      saveUninitialized : false,
      cookie : {
        httpOnly : true,
        secure : false
      } 
    })
  )

  app.useGlobalFilters(new HttpExceptionFilter())
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.useStaticAssets(join(__dirname,'..','public'));
  app.setViewEngine('hbs');

  await app.listen(5000);
}
bootstrap();
