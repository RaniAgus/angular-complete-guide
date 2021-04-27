import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showParagraph:boolean = false;
  log:number[] = [];

  onToggleDetails():void {
    this.showParagraph = !this.showParagraph;
    this.log.push(this.log.length + 1);
  }

  getColor(element: number) {
    return element < 5 ? '#333' : 'white';
  }
}
