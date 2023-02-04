import { Action, createReducer, on } from '@ngrx/store';
import * as SettingsActions from './settings.actions';

export const settingsFeatureKey = 'settings';

export interface State {
  language: string;
  timezone: string;
}

export const initialState: State = {
  language: 'en-NG',
  timezone: 'Africa/Lagos',
};

export const reducer = createReducer(
  initialState,

  on(SettingsActions.loadSettings, (state) => state),
  on(
    SettingsActions.updateSettings,
    (state: State, { language, timezone }): State => ({
      ...state,
      language,
      timezone,
    })
  )
);
