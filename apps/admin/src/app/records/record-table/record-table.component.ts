import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { RecordTableDataSource } from './record-table-datasource';
import { PowerRecord } from '@powerdey/api-interfaces';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'pw-admin-record-table',
  templateUrl: './record-table.component.html',
  styleUrls: ['./record-table.component.css'],
})
export class RecordTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<PowerRecord>;
  dataSource: RecordTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['recorded_at', 'location', 'device_id'];

  // TODO: Replace with repository
  constructor(firestore: Firestore) {
    this.dataSource = new RecordTableDataSource(firestore);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
