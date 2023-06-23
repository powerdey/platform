import { Action, createReducer, on } from '@ngrx/store';
import * as RecordsActions from './records.actions';
import { PowerRecord } from '@powerdey/api-interfaces';

export const recordsFeatureKey = 'records';

export interface State {
  records: PowerRecord[];
  error: any;
}

export const initialState: State = {
  records: [],
  error: undefined,
};

export const reducer = createReducer(
  initialState,

  on(RecordsActions.loadRecords, (state) => state),
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
