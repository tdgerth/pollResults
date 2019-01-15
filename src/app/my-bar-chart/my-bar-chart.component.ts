import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { createEmptyStateSnapshot } from '@angular/router/src/router_state';

@Component({
  selector: 'app-my-bar-chart',
  templateUrl: './my-bar-chart.component.html',
  styleUrls: ['./my-bar-chart.component.css']
})

export class MyBarChartComponent implements OnInit {

  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = false;
  public barChartData = [
    {data: [1]}
];
  public barChartColors = [{
    backgroundColor: [
      "rgba(227, 252, 245, 0.8)", 
      "rgba(204, 227, 250, 0.8)", 
      "rgba(234, 211, 248, 0.8)", 
      "rgba(173, 220, 201, 0.8)",
      "rgba(219, 235, 194, 0.8)",
      "rgba(253, 210, 181, 0.8)",
      "rgba(244, 139, 148, 0.8)",
      "rgba(205, 139, 98, 0.8)",
      "rgba(247, 239, 210, 0.8)",
      "rgba(238, 215, 161, 0.8)",
    ]
  }];

  public barChartOptions = {
    scaleShowVerticals: false,
    responsive: true,
    tooltips: {
      enabled: false,
    },
    hover: {
      mode: false
    },
    animation: {
      duration: 0,
      onComplete: function () {
        var chartInstance = this.chart,
            ctx = chartInstance.ctx;

        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';

        this.data.datasets.forEach(function (dataset, i) {
            var meta = chartInstance.controller.getDatasetMeta(i);
            meta.data.forEach(function (bar, index) {
                var data = dataset.data[index];
                var label = dataset.label;
                ctx.fillText(data, bar._model.x, bar._model.y + 15);
                // ctx.fillText(label, bar._model.x, bar._model.y + 30);
            });
        });
      }
    },
    scales: {
      xAxes: [{
        gridLines: {
          color: "white",
          offsetGridLines: false
        },
      }],
      yAxes: [{
        gridLines: {
          offsetGridLines: false
        },
        ticks: {
          beginAtZero: true,
        }
      }]
    }
    
  };
  
  teams = [];
  ranks = [];
  test = [];


  public scores: Observable<any[]>;
  public names: Observable<any[]>;
   
  constructor(private db: AngularFirestore) {
    this.scores = db.collection('results').valueChanges();
    this.names = db.collection('teams', res => res.orderBy('teamName', 'asc')).valueChanges();
  }

  ngOnInit() {
    this.getNames();
    this.getData();
  }

  // Initialize who the teams are from the 'teams' collection
  getNames() {
    this.names.subscribe(res => {
      console.log("Getting Teams");
      this.teams = [];
      this.ranks = []
      for(let i = 0; i < res.length; i++){
        this.teams.push(res[i].teamName);
        this.ranks.push(0);
      }
    })
  }

  // Get Data from the 'results' collection
  getData() {
    this.scores.subscribe(res => {
      console.log('Updating Data');
      for(var i = 0; i < res.length; i++){
        let order = [];
        for(let j = 0; j< res[i].poll.length; j++){
          order.push(res[i].poll[j].teamName);
        }
        for(let j = 0; j< this.teams.length; j++){
          let n = order.indexOf(this.teams[j]);
          this.ranks[j] += n;
        }
      }
      this.barChartLabels = this.teams;
      this.barChartData[0] = ({data:this.ranks}); 
      console.log(this.barChartData[0]);
    })
  }

}
