import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RecordingRoutingModule} from './recording-routing.module';
import {RecordingComponent} from './recording.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {GoogleMapsModule} from '@angular/google-maps';
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [RecordingComponent],
  imports: [
    CommonModule,
    RecordingRoutingModule,
    MatCardModule,
    MatButtonModule,
    GoogleMapsModule,
    MatSnackBarModule,
  ],
})
export class RecordingModule {}
