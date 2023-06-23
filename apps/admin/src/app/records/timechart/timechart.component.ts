import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Store } from '@ngrx/store';
import { selectAllRecords } from '../../store/records/records.selectors';
import { Subscription, tap } from 'rxjs';
import format from 'date-fns/format';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'pw-admin-timechart',
  templateUrl: './timechart.component.html',
  styleUrls: ['./timechart.component.scss'],
})
export class TimechartComponent implements OnInit, OnDestroy {
  subscription?: Subscription;

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [], //[28, 48, 40, 19, 86, 27, 90],
        label: 'Power Off',
        borderColor: 'rgba(255,5,10,1)',
        pointBackgroundColor: 'rgba(255,5,10,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
      },
      {
        data: [], //[38, 68, 70, 59, 76, 17, 20],
        label: 'Power On',
        borderColor: 'rgba(10,170,10,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
      },
    ],
    labels: [],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1.5,
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        position: 'left',
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },

    plugins: {
      legend: { display: true },
    },
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select(selectAllRecords)
      .pipe(
        tap((records) => {
          const on = new Map<string, number>();
          const off = new Map<string, number>();
          const dates = new Set<string>();

          records = [...records];

          records.sort((a, b) => {
            const at = new Timestamp(
                a.recorded_at.seconds,
                a.recorded_at.nanoseconds
              ).toDate(),
              bt = new Timestamp(
                b.recorded_at.seconds,
                b.recorded_at.nanoseconds
              ).toDate();
            if (at === bt) return 0;
            return at > bt ? 1 : -1;
          });

          records.forEach((record) => {
            const month = format(
              new Timestamp(
                record.recorded_at.seconds,
                record.recorded_at.nanoseconds
              ).toDate(),
              'LLL yy'
            );

            dates.add(month);

            if (record.on) {
              on.set(month, (on.get(month) ?? 0) + 1);
            } else {
              off.set(month, (off.get(month) ?? 0) + 1);
            }
          });

          const onDataSet: number[] = [];
          const offDataSet: number[] = [];

          const lineChartData = this.lineChartData;

          lineChartData.labels = [...dates];

          dates.forEach((date) => {
            onDataSet.push(on.get(date) ?? 0);
            offDataSet.push(off.get(date) ?? 0);
          });

          lineChartData.datasets[0].data.push(...onDataSet);
          lineChartData.datasets[1].data.push(...offDataSet);

          this.lineChartData = lineChartData;

          this.chart?.update();
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
