import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'record',
  },
  {
    path: 'record',
    loadChildren: () =>
      import('./recording/recording.module').then((m) => m.RecordingModule),
  },
];
