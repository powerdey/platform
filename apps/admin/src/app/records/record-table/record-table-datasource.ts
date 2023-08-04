import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, tap } from 'rxjs/operators';
import { merge, Observable } from 'rxjs';
import { PowerRecord } from '@powerdey/api-interfaces';
import { Store } from '@ngrx/store';
import { selectAllRecords } from '../../store/records/records.selectors';

/**
 * Data source for the RecordTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class RecordTableDataSource extends DataSource<PowerRecord> {
  data: PowerRecord[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private store: Store) {
    super();
  }

  private fetchData() {
    return this.store.select(selectAllRecords).pipe(
      tap((results) => (this.data = results)),
      tap((results) => console.log({ results }))
    );
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<PowerRecord[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(
        this.fetchData(),
        this.paginator.page,
        this.sort.sortChange
      ).pipe(
        map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        })
      );
    } else {
      throw Error(
        'Please set the paginator and sort on the data source before connecting.'
      );
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: PowerRecord[]): PowerRecord[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: PowerRecord[]): PowerRecord[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';

      const column = this.sort?.active;

      switch (column) {
        case 'recorded_at':
          return compare(
            a.recorded_at?.toDate(),
            b.recorded_at?.toDate(),
            isAsc
          );
        case 'location':
          return compare(
            JSON.stringify(a.location),
            JSON.stringify(b.location),
            isAsc
          );
        case 'device_id':
          return compare(a.device_id, b.device_id, isAsc);
        // case 'device_id': return compare(+a.id, +b.id, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(
  a: string | number,
  b: string | number,
  isAsc: boolean
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
