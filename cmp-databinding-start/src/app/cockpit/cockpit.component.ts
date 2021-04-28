import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output()
  serverCreated = new EventEmitter<{newServerName: string, newServerContent: string}>();
  @Output()
  blueprintCreated = new EventEmitter<{newServerName: string, newServerContent: string}>();

  newServerName = '';
  newServerContent = '';

  constructor() { }

  ngOnInit(): void {
  }

  onAddServer() {
    this.serverCreated.emit(
      { newServerName: this.newServerName
      , newServerContent: this.newServerContent
      }
    );
  }

  onAddBlueprint() {
    this.blueprintCreated.emit(
      { newServerName: this.newServerName
      , newServerContent: this.newServerContent
      }
    );
  }

}
