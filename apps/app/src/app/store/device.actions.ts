import { createAction, props } from '@ngrx/store';

export const loadDeviceId = createAction('[Device] Load Devices');

export const setDeviceId = createAction(
  '[Device] Set ID',
  props<{ deviceId: string }>()
);
