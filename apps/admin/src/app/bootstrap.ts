import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {
  connectFirestoreEmulator,
  getFirestore,
  provideFirestore,
} from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import * as firebaseConfig from '@powerdey/firebase-config';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics } from '@angular/fire/analytics';
import {
  connectStorageEmulator,
  getStorage,
  provideStorage,
} from '@angular/fire/storage';
import {
  getRemoteConfig,
  provideRemoteConfig,
} from '@angular/fire/remote-config';
const { emulators } = firebaseConfig;

export const firebaseModules = [
  provideFirebaseApp(() => {
    console.log(environment.firebase);
    return initializeApp(environment.firebase);
  }),
  provideFirestore(() => {
    const firestore = getFirestore();
    if (environment.useEmulators) {
      connectFirestoreEmulator(
        firestore,
        'localhost',
        emulators.firestore.port
      );
    }
    return firestore;
  }),
  providePerformance(() => getPerformance()),
  provideAuth(() => {
    const auth = getAuth();
    console.log({ environment });
    if (environment.useEmulators) {
      connectAuthEmulator(auth, `http://localhost:${emulators.auth.port}`);
    }
    return auth;
  }),
  provideRemoteConfig(() => getRemoteConfig()),
  provideAnalytics(() => getAnalytics()),
  provideStorage(() => {
    const storage = getStorage();
    if (environment.useEmulators) {
      connectStorageEmulator(storage, 'localhost', emulators.storage.port);
    }
    return storage;
  }),
];

export const materialModules = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
];
