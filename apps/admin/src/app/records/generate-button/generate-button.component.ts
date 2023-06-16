import { Component } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import * as geofire from 'geofire-common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { v4 } from 'uuid';
import { faker } from '@faker-js/faker';

@Component({
  selector: 'pw-admin-generate-button',
  templateUrl: './generate-button.component.html',
  styleUrls: ['./generate-button.component.scss'],
})
export class GenerateButtonComponent {
  constructor(private snackbar: MatSnackBar, private fireStore: Firestore) {}

  async generate() {
    const uniqueDevices = 50;
    const numRecords = 1000;
    const deviceIds: Array<string> = [];

    for (let i = 0; i < uniqueDevices; i++) {
      deviceIds.push(v4());
    }

    for (let i = 0; i < numRecords; i++) {
      const lat = faker.location.latitude();
      const lon = faker.location.longitude();

      const hash = geofire.geohashForLocation([lat, lon]);

      const location = {
        lat: lat,
        lng: lon,
        geohash: hash,
      };

      const docRef = await addDoc(collection(this.fireStore, 'records'), {
        on: faker.datatype.boolean({ probability: 0.3 }),
        location,
        recorded_at: faker.date.between({
          from: '2020-01-01T00:00:00.000Z',
          to: `2020-${i % 12}-01T00:00:00.000Z`,
        }),
        device_id: deviceIds[Math.floor(Math.random() * deviceIds.length)],
      });
    }

    this.snackbar.open(`Kpakam! E don enter`, undefined, {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
