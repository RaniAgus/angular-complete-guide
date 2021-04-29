import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  evenList: number[] = [];
  oddList: number[] = [];

  onNumberEmitted(number: number) {
    if(number % 2) {
      this.oddList.push(number);
    } else {
      this.evenList.push(number);
    }
  }
}
