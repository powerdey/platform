import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { Observable, EMPTY, tap } from 'rxjs';
import * as SettingsActions from './settings.actions';
import { Router } from '@angular/router';

@Injectable()
export class SettingsEffects {
  loadSettings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingsActions.loadSettings),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY as Observable<{ type: string }>)
    );
  });

  updateSettings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingsActions.updateSettings),
      tap((settings) => {
        const currentUrl = this.router.routerState.snapshot.url;
        const redirectUrl = getRedirectUrl(currentUrl, this.locale, settings);

        if (currentUrl !== redirectUrl) {
          window.location.href = redirectUrl;
        }
      }),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY as Observable<{ type: string }>)
    );
  });

  constructor(
    private actions$: Actions,
    private router: Router,
    @Inject(LOCALE_ID) private locale: string
  ) {}
}
export const defaultLocale = 'cpe-NG';

export function getRedirectUrl(
  currentUrl: string,
  currentLocale: string,
  settings: { language: string; timezone: string }
): string {
  return '/record';
}
