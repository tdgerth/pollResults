import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, interval, Subscription } from 'rxjs';
import { getViewData } from '@angular/core/src/render3/state';

@Component({
  selector: 'app-my-weighted-chart',
  templateUrl: './my-weighted-chart.component.html',
  styleUrls: ['./my-weighted-chart.component.css']
})
export class MyWeightedChartComponent implements OnInit {
  
  teams = [];
  ranks: Array<any> = [];
  labels = [];

  public names: Observable<any[]>;
  public scores: Observable<any[]>;

  public lineChartData:Array<any> = [];
  public lineChartLabels:Array<any> = [];

  public lineColors: Array<any> = [
    { borderColor: '#e6194b' },
    { borderColor: '#3cb44b' }, 
    { borderColor: '#ffe119' }, 
    { borderColor: '#4363d8' },
    { borderColor: '#f58231' }, 
    { borderColor: '#911eb4' }, 
    { borderColor: '#46f0f0' }, 
    { borderColor: '#f032e6' }, 
    { borderColor: '#bcf60c' }, 
    { borderColor: '#fabebe' }, 
    { borderColor: '#008080' }, 
    { borderColor: '#e6beff' }, 
    { borderColor: '#9a6324' }, 
    { borderColor: '#fffac8' }, 
    { borderColor: '#800000' }, 
    { borderColor: '#aaffc3' }, 
    { borderColor: '#808000' }, 
    { borderColor: '#ffd8b1' }, 
    { borderColor: '#808080' }, 
  ];
  
  public lineChartOptions:any = {
    responsive: true,
    animation: {
      duration: 0,
    }
  };

  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  constructor(private db: AngularFirestore) {
    this.scores = db.collection('results').valueChanges();
    this.names = db.collection('teams', res => res.orderBy('teamName', 'asc')).valueChanges();
  }

  ngOnInit() {
    this.getNames();
    this.getData();
  }

  getNames() {
    this.names.subscribe(res => {
      console.log("Getting Teams");
      this.teams = [];
      this.ranks = [];
      this.labels = [];
      let n = res.length;
      for(let i = 0; i < res.length; i++){
        this.teams.push(res[i].teamName);
        this.ranks[i] = ({ data: new Array(n).fill(0) });
        this.labels.push(i);
      }
      console.log(this.teams)
      console.log(this.ranks)
    })
  }

  getData() {
    this.scores.subscribe(res => {
      console.log("Updating Data");
      for(let i = 0; i < res.length; i ++) {
        let order = [];
        for(let j = 0; j < res[i].poll.length; j++) {
          order.push(res[i].poll[j].teamName);
        }
        for(let j = 0; j < this.teams.length; j++) {
          let n = order.indexOf(this.teams[j]);
          this.ranks[j].data[n] += 1;
          //console.log(this.ranks[j]);
        }
      }
      this.lineChartLabels = this.labels;
      for(let i = 0; i < this.teams.length; i++) {
        this.lineChartData[i] = ({data: this.ranks[i].data, label: this.teams[i], fill: false})
      }
      console.log(this.ranks);
    })
    // console.log(this.ranks);
  }

}
