import { isDevMode } from '@angular/core';

export const environment = {
  firebase: {
    apiKey: '',
    appId: '',
    authDomain: '',
    databaseURL: '',
    measurementId: '',
    messagingSenderId: '',
    projectId: '',
    storageBucket: '',
  },
  useEmulators: isDevMode(),
};
