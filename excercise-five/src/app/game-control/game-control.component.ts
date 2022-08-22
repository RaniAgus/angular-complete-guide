import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css'],
})
export class GameControlComponent implements OnInit {
  num = 0;
  interval = null;

  @Output()
  numberEmitted = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  onStart(): void {
    this.interval = setInterval(() => this.numberEmitted.emit(++this.num), 500);
  }

  onStop(): void {
    clearInterval(this.interval);
    this.interval = null;
  }
}
