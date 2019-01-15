import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-pie-chart',
  templateUrl: './my-pie-chart.component.html',
  styleUrls: ['./my-pie-chart.component.css']
})
export class MyPieChartComponent implements OnInit {

  public pieChartLabels = [];
  public pieChartData = [];
  public pieChartType = 'pie';
  public chartColors: any[] = [
    { 
      backgroundColor:[
        "#e3fcf5", 
        "#cce3fa", 
        "#ead3f8", 
        "#addcc9",
        "#dbebc2",
        "#fdd2b5",
        "#f48b94",
        "#cd8b62",
        "#f7efd2",
        "#eed7a1",
      ] 
    }];
    
  teams = [];
  ranks = [];
  test = [];

  public barChartData = [];

  public stuff: Observable<any[]>;

  constructor(private db: AngularFirestore) {

    this.stuff = db.collection('teams', ref => ref.orderBy('teamName','asc')).valueChanges();

    this.stuff.subscribe(res => {
      this.teams =[];
      this.ranks =[];
      for(var i = 0; i < res.length; i++){
        this.teams.push(res[i].teamName);
        this.ranks.push(res[i].teamRank);
      }
      for(var i = 0; i < res.length; i++) {
        this.pieChartData[i] = this.ranks[i];
        this.pieChartLabels[i] = this.teams[i]
      }
      this.pieChartLabels = this.teams;
      this.pieChartData = this.ranks;
      console.log(this.pieChartData);
      console.log(this.pieChartLabels);
    })
  }

  ngOnInit() {
  }

}
