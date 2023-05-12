import { createAction, props } from '@ngrx/store';
import { UserInfo } from '@angular/fire/auth';

export const loadAuths = createAction('[Auth] Load Auths');

export const setAuthUser = createAction(
  '[Auth] Set User',
  props<{ user: UserInfo }>()
);

export const clearAuthUser = createAction('[Auth] Clear User');
