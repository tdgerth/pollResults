import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-radar-chart',
  templateUrl: './my-radar-chart.component.html',
  styleUrls: ['./my-radar-chart.component.css']
})
export class MyRadarChartComponent implements OnInit {

  public radarChartLabels = ['','','','','','','','','',''];
  public radarChartData = [{data:[0,0,0,0,0,0,0,0,0,0],label:''}];
  public radarChartType = 'radar';
  
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
      //this.radarChartData = [{data: this.ranks, label:'Teams'}];
      //this.radarChartLabels = this.teams;

      for(var i = 0; i < res.length; i++) {
        this.radarChartData[0].data[i] = this.ranks[i];
        this.radarChartLabels[i] = this.teams[i];
      }
      this.radarChartData[0].data = this.ranks;
      this.radarChartLabels = this.teams;
      this.radarChartData[0].label = 'Teams';
    })

    //this.radarChartData = [{data: this.ranks, label:'Teams'}];
  }

  ngOnInit() {
  }

}
