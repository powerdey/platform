import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  TimeRange,
  timeRangeOptions,
} from '../../store/records/records.filters';
import { loadRecords } from '../../store/records/records.actions';

@Component({
  selector: 'pw-admin-records-filter',
  templateUrl: './records-filter.component.html',
  styleUrls: ['./records-filter.component.scss'],
})
export class RecordsFilterComponent {
  selectedValue = TimeRange.ALL;
  timeRangeOptions = timeRangeOptions;
  constructor(private store: Store) {}

  updateSelection() {
    console.log('Selection changed!:', this.selectedValue);
    this.store.dispatch(loadRecords({ range: this.selectedValue }));
  }
}
