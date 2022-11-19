import {ExpressAdapter} from "@nestjs/platform-express";

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('source-map-support').install();

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import * as express from 'express';
import * as functions from 'firebase-functions';
import { RedocModule, RedocOptions } from '@nicholas.braun/nestjs-redoc';

const expressInstance = express();


const globalPrefix = '';
const localPrefix = 'api';

async function createApp() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance));
  app.setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
    .setTitle('Powerdey Api')
    .setDescription('Powerdey API description')
    .setVersion('1.0')
    .addTag('powerdey')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(globalPrefix, app, document);

  const redocOptions: RedocOptions = {
    title: 'Powerdey',
    sortPropsAlphabetically: true,
    hideDownloadButton: false,
    hideHostname: false,
    tagGroups: [],
  };

  await RedocModule.setup('/docs', app, document, redocOptions);

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
