import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayParagraph:boolean = false;
  clicks:number[] = [];

  onClick():void {
    this.displayParagraph = !this.displayParagraph;
    this.clicks.push(this.clicks.length + 1);
  }

  getColor(num: number) {
    return num < 5 ? '#333' : 'white';
  }
}
