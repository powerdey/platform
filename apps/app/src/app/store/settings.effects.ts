import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { Observable, EMPTY, tap } from 'rxjs';
import * as SettingsActions from './settings.actions';
import { Router } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

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
        const currentUrl = `${
          this.appBaseHref
        }${this.router.routerState.snapshot.url.substring(1)}`;
        const redirectUrl = getRedirectUrl(currentUrl, this.locale, settings);
        console.log({ redirectUrl, currentUrl, appBaseHref: this.appBaseHref });
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
    @Inject(LOCALE_ID) private locale: string,
    @Inject(APP_BASE_HREF) private appBaseHref: string
  ) {}
}
export const defaultLocale = 'cpe-NG';

export function getRedirectUrl(
  currentUrl: string,
  currentLocale: string,
  settings: { language: string; timezone: string }
): string {
  if (settings.language == currentLocale) {
    return currentUrl;
  }
  if (settings.language == defaultLocale) {
    return currentUrl.substring(settings.language.length);
  }
  if (currentLocale == defaultLocale) {
    return `/${settings.language}${currentUrl}`;
  }
  return currentUrl.replace(currentLocale, settings.language);
}
