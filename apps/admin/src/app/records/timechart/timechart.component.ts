import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'pw-admin-timechart',
  templateUrl: './timechart.component.html',
  styleUrls: ['./timechart.component.scss'],
})
export class TimechartComponent implements OnInit {
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [], //[28, 48, 40, 19, 86, 27, 90],
        label: 'Power Off',
        borderColor: 'rgba(255,5,10,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
      },
      {
        data: [], //[38, 68, 70, 59, 76, 17, 20],
        label: 'Power On',
        borderColor: 'rgba(10,170,10,1)',
        pointBackgroundColor: 'rgba(255,5,10,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
      },
    ],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
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

  private static generateNumber(i: number): number {
    return Math.floor(Math.random() * (i < 2 ? 100 : 1000) + 1);
  }

  ngOnInit(): void {
    for (let i = 0; i < 7; i++) {
      this.lineChartData.datasets[0].data.push(Math.ceil(1000 * Math.random()));
      this.lineChartData.datasets[1].data.push(Math.ceil(1000 * Math.random()));
    }
  }
}
