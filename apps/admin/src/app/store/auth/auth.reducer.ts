import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { UserInfo } from '@angular/fire/auth';

export const authFeatureKey = 'auth';

export interface AuthState {
  user?: UserInfo;
}

export const initialState: AuthState = {};

export const reducer = createReducer(
  initialState,

  on(AuthActions.loadAuths, (state) => state),
  on(
    AuthActions.setAuthUser,
    (state, { user }): AuthState => ({
      ...state,
      user,
    })
  ),
  on(AuthActions.clearAuthUser, (state) => ({
    ...initialState,
  }))
);
