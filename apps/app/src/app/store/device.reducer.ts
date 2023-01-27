import { Action, createReducer, on } from '@ngrx/store';
import * as DeviceActions from './device.actions';

export const deviceFeatureKey = 'device';

export interface State {
  deviceId: string;
}

export const initialState: State = {
  deviceId: '',
};

export const reducer = createReducer(
  initialState,

  on(DeviceActions.loadDeviceId, (state: State): State => state),
  on(
    DeviceActions.setDeviceId,
    (state: State, { deviceId }): State => ({
      ...state,
      deviceId,
    })
  )
);
