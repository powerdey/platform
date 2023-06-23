import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import * as RecordsActions from './records.actions';
import { RecordsRepositoryService } from '../../repositories/records-repository.service';

@Injectable()
export class RecordsEffects {
  loadRecords$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecordsActions.loadRecords),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.repository.fetch().pipe(
          map((records) => RecordsActions.loadRecordsSuccess({ records })),
          catchError((error) =>
            of(RecordsActions.loadRecordsFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private repository: RecordsRepositoryService
  ) {}
}
