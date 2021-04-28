import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output('svCreated')
  serverCreated = new EventEmitter<{newServerName: string, newServerContent: string}>();
  @Output('bpCreated')
  blueprintCreated = new EventEmitter<{newServerName: string, newServerContent: string}>();

  constructor() { }

  ngOnInit(): void {
  }

  onAddServer(newServerName: HTMLInputElement, newServerContent: HTMLInputElement) { // Muy importante, es un HTML Input Event
    this.serverCreated.emit(
      { newServerName: newServerName.value
      , newServerContent: newServerContent.value
      }
    );
  }

  onAddBlueprint(newServerName: HTMLInputElement, newServerContent: HTMLInputElement) {
    this.blueprintCreated.emit(
      { newServerName: newServerName.value
      , newServerContent: newServerContent.value
      }
    );
  }

}
