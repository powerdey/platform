import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map } from 'rxjs/operators';
import { of, switchMap } from 'rxjs';
import * as RecordsActions from './records.actions';
import { RecordsRepositoryService } from '../../repositories/records-repository.service';
import { TimeRange } from './records.filters';
import { QueryConstraint } from '@firebase/firestore';
import { subDays, subMonths, subYears } from 'date-fns';
import { where } from '@angular/fire/firestore';

@Injectable()
export class RecordsEffects {
  loadRecords$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecordsActions.loadRecords),
      switchMap(({ range }) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.repository.fetch(...buildQueryRange(range)).pipe(
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

function buildQueryRange(range: TimeRange): QueryConstraint[] {
  let from: Date;
  const now = new Date();

  switch (range) {
    case TimeRange.DAY:
      from = subDays(now, 1);
      break;
    case TimeRange.WEEK:
      from = subDays(now, 7);
      break;
    case TimeRange.MONTH:
      from = subMonths(now, 1);
      break;
    case TimeRange.SIX_MONTHS:
      from = subMonths(now, 6);
      break;
    case TimeRange.YEAR:
      from = subYears(now, 1);
      break;
    case TimeRange.ALL:
    default:
      return [];
  }

  return [where('recorded_at', '>=', from)];
}
