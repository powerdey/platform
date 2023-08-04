import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  Firestore,
  query,
} from '@angular/fire/firestore';
import { PowerRecord } from '@powerdey/api-interfaces';
import { v4 } from 'uuid';
import * as geofire from 'geofire-common';
import { faker } from '@faker-js/faker';
import { QueryConstraint } from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class RecordsRepositoryService {
  constructor(private firestore: Firestore) {}

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

      await addDoc(collection(this.firestore, 'records'), {
        on: faker.datatype.boolean({ probability: 0.3 }),
        location,
        recorded_at: faker.date.between({
          from: '2020-01-01T00:00:00.000Z',
          to: `2020-${i % 12}-01T00:00:00.000Z`,
        }),
        device_id: deviceIds[Math.floor(Math.random() * deviceIds.length)],
      });
    }
  }

  fetch(...queryConstraints: QueryConstraint[]) {
    return collectionData(
      query(
        collection(
          this.firestore,
          'records'
        ) as CollectionReference<PowerRecord>,
        ...queryConstraints
      )
    );
  }
}
