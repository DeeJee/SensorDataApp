import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Series } from './series';
import { DataModel } from '../../models/datamodel';


@Component({
  selector: 'sensorDataChart',
  template: `
  <div style="display: block;">

    <canvas id="myChart" baseChart 
                [datasets]="lineChartData"
                [labels]="lineChartLabels"
                [options]="lineChartOptions"
                [colors]="lineChartColors"
                [legend]="lineChartLegend"
                [chartType]="lineChartType"
                (chartHover)="chartHovered($event)"
                (chartClick)="chartClicked($event)">
    </canvas>
  </div>
  `
})

export class SensorDataChartComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    this.lineChartData.push(new Series(this.feed, this.values));
  }


  errorMessages: any;
  public loading: boolean;
  @Input() public values: any[];
  @Input() public feed: string;
  @Input() public datasource: string;

  @Input() public lineChartData: Series[] = [];
  @Input() public lineChartLabels: any[] = [];

  public addDatapoint(data: DataModel): void {
      this.lineChartData = [];

      let val = data.Payload[this.feed];
      this.values.push(val);
      this.lineChartLabels.push(data.TimeStamp);

      this.lineChartData.push(new Series(this.feed, this.values));
  }

  public lineChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          beginAtZero: true,
        }
      }]
    },
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
