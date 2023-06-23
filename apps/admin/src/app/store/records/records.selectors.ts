import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRecords from './records.reducer';

export const selectRecordsState = createFeatureSelector<fromRecords.State>(
  fromRecords.recordsFeatureKey
);

export const selectAllRecords = createSelector(
  selectRecordsState,
  (state) => state.records
);
export const selectRecordError = createSelector(
  selectRecordsState,
  (state) => state.error
);
