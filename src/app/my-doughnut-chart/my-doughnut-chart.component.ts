import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-my-doughnut-chart',
  templateUrl: './my-doughnut-chart.component.html',
  styleUrls: ['./my-doughnut-chart.component.css']
})
export class MyDoughnutChartComponent implements OnInit {

  public doughnutChartLabels = [];
  public doughnutChartData = [];
  public doughnutChartType = 'polarArea';
  public chartColors: any[] = [
    { 
      backgroundColor:[
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

  getNames() {
    this.names.subscribe(res => {
      console.log("Getting Teams");
      this.teams = [];
      this.ranks = [];
      for(let i = 0; i < res.length; i++){
        this.teams.push(res[i].teamName);
        this.doughnutChartLabels[i] = this.teams[i];
        this.ranks.push(0);
      }
    })
  }

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
        this.doughnutChartData = this.ranks;
        console.log(this.doughnutChartData);
      })
    }
}
