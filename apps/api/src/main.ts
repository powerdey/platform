import {ExpressAdapter} from "@nestjs/platform-express";

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('source-map-support').install();

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AppModule } from './app/app.module';
import * as express from 'express';
import * as functions from 'firebase-functions';

const expressInstance = express();


const globalPrefix = '';
const localPrefix = 'api';

async function createApp() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance));
  return app;
}

async function bootstrap() {
  const app = await createApp();
  app.setGlobalPrefix(localPrefix);
  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

async function bootstrapServerless() {
  const app = await createApp();
  app.setGlobalPrefix(process.env.FIREBASE_CONFIG ? localPrefix : globalPrefix);
  await app.init();
}

const runtimeOpts: functions.RuntimeOptions = {
  memory: '256MB',
  maxInstances: 2,
};

declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
// Start the server when executed directly, ie when file isn't a module
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  bootstrap();
} else {
  bootstrapServerless();
}

export const api = functions.runWith(runtimeOpts).https.onRequest((request, response) => {
  expressInstance(request, response);
});
