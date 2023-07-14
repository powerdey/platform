import { createAction, props } from '@ngrx/store';
import { PowerRecord } from '@powerdey/api-interfaces';
import { TimeRange } from './records.filters';

export const loadRecords = createAction(
  '[Records] Load Records',
  props<{ range: TimeRange }>()
);

export const loadRecordsSuccess = createAction(
  '[Records] Load Records Success',
  props<{ records: PowerRecord[] }>()
);

export const loadRecordsFailure = createAction(
  '[Records] Load Records Failure',
  props<{ error: any }>()
);
