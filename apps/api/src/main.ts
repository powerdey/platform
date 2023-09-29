import { ExpressAdapter } from '@nestjs/platform-express';

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
import { LoggerMiddleware } from './app/middleware/logger.middleware';
import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { logger } from 'firebase-functions/v2';
import { BigQuery } from '@google-cloud/bigquery';
import { v4 } from 'uuid';
import * as admin from 'firebase-admin';

const expressInstance = express();

const globalPrefix = '';
const localPrefix = 'api';

async function createApp(prefix: string) {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance)
  );
  const config = new DocumentBuilder()
    .setTitle('Powerdey')
    .setDescription('Powerdey API description')
    .setVersion('1.0')
    .addTag('powerdey')
    .build();

  // todo: figure out dependencies and smarter injection
  app.use(new LoggerMiddleware().use);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(prefix, app, document);

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
  const app = await createApp(localPrefix);
  app.setGlobalPrefix(localPrefix);
  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${localPrefix}`
  );
}

async function bootstrapServerless() {
  const prefix = process.env.FIREBASE_CONFIG ? localPrefix : globalPrefix;
  const app = await createApp(prefix);
  app.setGlobalPrefix(prefix);
  await app.init();
  Logger.log(`🚀 Application is configured to run at: /${prefix}`);
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

export const api = functions
  .runWith(runtimeOpts)
  .https.onRequest((request, response) => {
    expressInstance(request, response);
  });

export const syncBigQuery = onCall(
  {
    cors: true,
    invoker: 'public',
  },
  async (request) => {
    // Creates a client
    const bigqueryClient = new BigQuery();

    await bigqueryClient
      .dataset('power_records')
      .table('records')
      .insert([
        {
          on: true,
          recorded_at: new Date(),
          device_id: v4(),
        },
      ]);
  }
);
