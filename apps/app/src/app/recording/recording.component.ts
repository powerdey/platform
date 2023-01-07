import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GoogleMap } from '@angular/google-maps';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

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
  constructor(private snackbar: MatSnackBar, private httpClient: HttpClient) {
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
}
