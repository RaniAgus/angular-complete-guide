import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  num: number = 0;
  ref = null;

  @Output('ref') 
  refEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onStart() {
    this.ref = setInterval(() => this.refEvent.emit(this.num++), 500);
  }

  onStop() {
    clearInterval(this.ref);
    this.ref = null;
  }

}
