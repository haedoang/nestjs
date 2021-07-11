import { Controller, Get, Render, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('main')
  getHello(@Req() request) {
    const twits = [];
    return { title : 'SNS', twits }
  }

  @Get('/profile')
  @Render('profile')
  profile(){
    return { title : '내 정보 - SNS'};
  }

  @Get('/join')
  @Render('join')
  join(){
    return { title : '회원가입 - SNS'};
  }
  

}
