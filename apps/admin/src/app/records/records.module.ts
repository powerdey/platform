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
import { RecordsFilterComponent } from './records-filter/records-filter.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RecordsComponent,
    RecordTableComponent,
    TimechartComponent,
    GenerateButtonComponent,
    RecordsFilterComponent,
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
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
})
export class RecordsModule {}
