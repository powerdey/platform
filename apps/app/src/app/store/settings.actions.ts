import { createAction, props } from '@ngrx/store';

export const loadSettings = createAction('[Settings] Load Settings');

export const updateSettings = createAction(
  '[Settings] Update Settings',
  props<{ language: string; timezone: string }>()
);
