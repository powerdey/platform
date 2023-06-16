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
import { GenerateButtonComponent } from './generate-button/generate-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    RecordsComponent,
    RecordTableComponent,
    TimechartComponent,
    GenerateButtonComponent,
  ],
  imports: [
    CommonModule,
    RecordsRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgChartsModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
})
export class RecordsModule {}
