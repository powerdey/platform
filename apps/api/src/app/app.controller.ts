import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { Message } from '@powerdey/api-interfaces';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  @ApiResponse({status: 200, description: "200 response"})
  getData(): Message {
    return this.appService.getData();
  }
}
