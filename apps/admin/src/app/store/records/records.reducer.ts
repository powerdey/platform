import { createReducer, on } from '@ngrx/store';
import * as RecordsActions from './records.actions';
import { PowerRecord } from '@powerdey/api-interfaces';
import { TimeRange } from './records.filters';

export const recordsFeatureKey = 'records';

export interface State {
  records: PowerRecord[];
  range: TimeRange;
  error: any;
}

export const initialState: State = {
  records: [],
  error: undefined,
  range: TimeRange.ALL,
};

export const reducer = createReducer(
  initialState,

  on(
    RecordsActions.loadRecords,
    (state, { range }): State => ({
      ...state,
      range,
    })
  ),
  on(
    RecordsActions.loadRecordsSuccess,
    (state, { records }): State => ({ ...state, error: undefined, records })
  ),
  on(RecordsActions.loadRecordsFailure, (state, { error }) => ({
    ...state,
    records: [],
    error,
  }))
);
