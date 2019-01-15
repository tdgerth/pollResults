import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  onResize(event) {
    event.target.innerWidth;
  }

  title = 'pollResults';
}

