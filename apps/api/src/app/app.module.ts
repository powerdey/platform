import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {RecordingModule} from './features/recording/recording.module';
import {MapsApiKeyController} from './features/maps-api-key/maps-api-key.controller';

@Module({
  imports: [RecordingModule],
  controllers: [AppController, MapsApiKeyController],
  providers: [AppService],
})
export class AppModule {
}
