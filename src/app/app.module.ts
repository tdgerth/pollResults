import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { ChartsModule } from 'ng2-charts';
import { MyBarChartComponent } from './my-bar-chart/my-bar-chart.component';
import { MyDoughnutChartComponent } from './my-doughnut-chart/my-doughnut-chart.component';
import { MyRadarChartComponent } from './my-radar-chart/my-radar-chart.component';
import { MyPieChartComponent } from './my-pie-chart/my-pie-chart.component';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MyWeightedChartComponent } from './my-weighted-chart/my-weighted-chart.component';


// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyCat0mcZbCnGMGLisXzfqabzsvQItcUx30",
  authDomain: "crowdpoll-bdea7.firebaseapp.com",
  databaseURL: "https://crowdpoll-bdea7.firebaseio.com",
  projectId: "crowdpoll-bdea7",
  storageBucket: "crowdpoll-bdea7.appspot.com",
  messagingSenderId: "922980354182"
};

@NgModule({
  declarations: [
    AppComponent,
    MyBarChartComponent,
    MyDoughnutChartComponent,
    MyRadarChartComponent,
    MyPieChartComponent,
    MyWeightedChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    ChartsModule,
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
