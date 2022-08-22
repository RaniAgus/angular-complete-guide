import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  evenList: number[] = [];
  oddList: number[] = [];

  onNumberEmitted(n: number): void {
    if (n % 2) {
      this.oddList.push(n);
    } else {
      this.evenList.push(n);
    }
  }
}
