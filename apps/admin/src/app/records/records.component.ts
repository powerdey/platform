import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadRecords } from '../store/records/records.actions';
import { TimeRange } from '../store/records/records.filters';

@Component({
  selector: 'pw-admin-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss'],
})
export class RecordsComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadRecords({ range: TimeRange.ALL }));
  }
}
