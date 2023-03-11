import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { getRedirectUrl, SettingsEffects } from './settings.effects';

describe('SettingsEffects', () => {
  let actions$: Observable<any>;
  let effects: SettingsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SettingsEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(SettingsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});

describe('getRedirectUrl', () => {
  it.each([
    ['/record', 'cpe-NG', { language: 'cpe-NG', timezone: '' }, '/record'],
    // ['/record', 'cpe-NG', {language: 'en-US', timezone: ''}, '/en-US/record'],
    // ['/en-US/record', 'en-US', {language: 'en-US', timezone: ''}, '/en-US/record'],
    ['/en-US/record', 'en-US', { language: 'cpe-NG', timezone: '' }, '/record'],
    // ['/en-US/record', 'en-US', {language: 'fr-FR', timezone: ''}, '/fr-FR/record'],
  ])(
    'given (%s, %s, %s)',
    (
      currentUrl: string,
      currentLocale: string,
      settings: { language: string; timezone: string },
      expected: string
    ) => {
      expect(getRedirectUrl(currentUrl, currentLocale, settings)).toEqual(
        expected
      );
    }
  );
});
