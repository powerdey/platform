import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

(async function () {
  const response = await fetch('/__/firebase/init.json');
  environment.firebase = await response.json();

  await platformBrowserDynamic().bootstrapModule(AppModule);
})().catch((err) => console.error(err));
