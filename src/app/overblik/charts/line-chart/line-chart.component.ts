import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';



type Plot = {
  timeInterval: string;
  pointQuantity: string;
}
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: [ './line-chart.component.scss' ]
})
export class LineChartComponent implements OnInit{

  constructor() {
  //   this.lineChartData = {
  //   datasets:  [
  //   { data: [], label: 'Data Set 1' },
  //   ]
  // }
  }

  @Input() myEnergyData: any[] = [];

  points: Plot[] = [];
  points2: Plot[] = [];
  pointQuantity: number[] = [];
  pointQuantity2: number[] = [];
  pointLabels: string[] = [];

  ngOnInit(): void {
    let test = this.myEnergyData[0]?.supplierTimeSeries[0].pointQuantity;

    this.myEnergyData[0]?.supplierTimeSeries[0].forEach((element: Plot) => {
      this.points.push(element);
    });

    this.points.forEach((point) => {
      this.pointQuantity.push(parseFloat(point.pointQuantity));
    });

    this.points.forEach((point) =>{
      let dateString = new Date(point.timeInterval.split(" ")[0]).toLocaleString('da-dk');
      this.pointLabels.push(dateString);
    })

    this.myEnergyData[1]?.supplierTimeSeries[0].forEach((element: Plot) => {
      this.points2.push(element);
    });

    this.points2.forEach((point) => {
      this.pointQuantity2.push(parseFloat(point.pointQuantity));
    });

    if(this.myEnergyData.length > 1){
      console.log("There is data in myEnergyData!");
    }

    // this.lineChartData.datasets[0] = {
    //   data: this.pointQuantity,
    //   label: 'Series A',
    //     backgroundColor: 'rgba(148,159,177,0.2)',
    //     borderColor: 'rgba(148,159,177,1)',
    //     pointBackgroundColor: 'rgba(148,159,177,1)',
    //     pointBorderColor: '#fff',
    //     pointHoverBackgroundColor: '#fff',
    //     pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    //     fill: 'origin',
    // }
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: this.pointQuantity,
        label: 'Series A',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: this.pointQuantity2,
        label: 'Series B',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      }
    ],
    labels: this.pointLabels,
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
        {
          position: 'left',
        },
      'y-axis-1': {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red'
        }
      }
    },

    plugins: {
      legend: { display: true },
      // annotation: {
      //   annotations: [
      //     {
      //       type: 'line',
      //       scaleID: 'x',
      //       value: 'March',
      //       borderColor: 'orange',
      //       borderWidth: 2,
      //       label: {
      //         position: 'center',
      //         enabled: true,
      //         color: 'orange',
      //         content: 'LineAnno',
      //         font: {
      //           weight: 'bold'
      //         }
      //       }
      //     },
      //   ],
      // }
    }
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  private static generateNumber(i: number): number {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
   // console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }
}
