export interface PowerRecord {
  on: boolean;
  location: PowerLocation;
  recorded_at: any;
  device_id: string;
}

export interface PowerLocation {
  lng: number;
  geohash: string;
  lat: number;
}
