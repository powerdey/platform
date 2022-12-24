import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {GoogleMap} from "@angular/google-maps";

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

  // TODO: Lazy-load Google maps javascript
  constructor(private snackbar: MatSnackBar) {
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
          console.error({positionError})
          this.snackbar.open(`Unable to set current location: ${positionError.message}`);
        }
      );
    }
  }
}
