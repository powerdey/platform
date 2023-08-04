import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { RecordsEffects } from './records.effects';
import { RecordsRepositoryService } from '../../repositories/records-repository.service';
import { mock } from 'jest-mock-extended';

describe('RecordsEffects', () => {
  let actions$: Observable<any>;
  let effects: RecordsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RecordsEffects,
        provideMockActions(() => actions$),
        {
          provide: RecordsRepositoryService,
          useValue: mock(RecordsRepositoryService),
        },
      ],
    });

    effects = TestBed.inject(RecordsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
