import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromDevice from './device.reducer';

export const selectDeviceState = createFeatureSelector<fromDevice.State>(
  fromDevice.deviceFeatureKey
);

export const selectDeviceId = createSelector(
  selectDeviceState,
  (state) => state.deviceId
);
