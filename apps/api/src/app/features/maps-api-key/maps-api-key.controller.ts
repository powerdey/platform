import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { MapApiResponse, MapApiResponseConcrete } from '@powerdey/api-interfaces';



@Controller('maps-api-key')
export class MapsApiKeyController {
  @Get()
  @ApiResponse({status: 200, description: "200 response", type: MapApiResponseConcrete})
  getData(): MapApiResponse {
    return {
      apiKey: "AIzaSyDMi3IPLBohxlVF7gtCJGyPZRzxlknyrWc",
    }
  }
}
