import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  num: number = 0;
  interval = null;

  @Output('numberEmitted') 
  numberEmitter = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onStart() {
    this.interval = setInterval(() => this.numberEmitter.emit(++this.num), 500);
  }

  onStop() {
    clearInterval(this.interval);
    this.interval = null;
  }

}
