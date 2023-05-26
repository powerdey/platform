import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordsRoutingModule } from './records-routing.module';
import { RecordsComponent } from './records.component';
import { RecordTableComponent } from './record-table/record-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TimechartComponent } from './timechart/timechart.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [RecordsComponent, RecordTableComponent, TimechartComponent],
  imports: [
    CommonModule,
    RecordsRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgChartsModule,
  ],
})
export class RecordsModule {}
