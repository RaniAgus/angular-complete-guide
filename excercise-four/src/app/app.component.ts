import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showParagraph = false;
  log: Date[] = [];

  onToggleDetails(): void {
    this.showParagraph = !this.showParagraph;
    // this.log.push(this.log.length + 1);
    this.log.push(new Date());
  }

  getColor(element: number): string {
    return element < 4 ? '#333' : 'white';
  }
}
