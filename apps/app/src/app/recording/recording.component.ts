import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GoogleMap } from '@angular/google-maps';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {
  Firestore,
  addDoc,
  collection,
  serverTimestamp,
} from '@angular/fire/firestore';
import * as geofire from 'geofire-common';

@Component({
  selector: 'powerdey-recording',
  templateUrl: './recording.component.html',
  styleUrls: ['./recording.component.scss'],
})
export class RecordingComponent implements OnInit {
  options: google.maps.MapOptions = {};

  center!: google.maps.LatLngLiteral;

  @ViewChild(GoogleMap)
  map!: GoogleMap;

  markerOptions: google.maps.MarkerOptions = {
    label: 'Your domot',
  };

  apiLoaded: Observable<boolean>;

  // TODO: Lazy-load Google maps javascript
  constructor(
    private snackbar: MatSnackBar,
    private httpClient: HttpClient,
    private fireStore: Firestore
  ) {
    this.apiLoaded = of({
      apiKey: environment.firebase.apiKey,
    }).pipe(
      switchMap((response) =>
        httpClient.jsonp(
          `https://maps.googleapis.com/maps/api/js?key=${response.apiKey}&libraries=visualization`,
          'callback'
        )
      ),
      map(() => true),
      catchError(() => of(false))
    );
  }

  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
        },
        (positionError) => {
          console.error({ positionError });
          this.snackbar.open(
            `Unable to set current location: ${positionError.message}`
          );
        }
      );
    }
  }

  async record(eDey: boolean) {
    const hash = geofire.geohashForLocation([this.center.lat, this.center.lng]);

    const location = {
      lat: this.center.lat,
      lng: this.center.lng,
      geohash: hash,
    };

    const docRef = await addDoc(collection(this.fireStore, 'records'), {
      on: eDey,
      location,
      recorded_at: serverTimestamp(),
      device_id: '',
    });

    this.snackbar.open(`Kpakam! E don enter`, undefined, {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
