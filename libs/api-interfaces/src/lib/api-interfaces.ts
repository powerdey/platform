import { ApiProperty } from '@nestjs/swagger';

export interface Message {
  message: string;
}
export interface MapApiResponse {
  apiKey: string;
}

export class MapApiResponseConcrete implements MapApiResponse {
  @ApiProperty()
  apiKey: string,
}
