import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css'],
})
export class CockpitComponent implements OnInit {
  @Output()
  svCreated = new EventEmitter<{
    newServerName: string;
    newServerContent: string;
  }>();

  @Output()
  bpCreated = new EventEmitter<{
    newServerName: string;
    newServerContent: string;
  }>();

  @ViewChild('serverContentInput', { static: true }) // '#selector', { static: true } // Se puede pasar el tipo de componente también
  serverContentInput: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  onAddServer(newServerName: HTMLInputElement): void {
    // Muy importante, es un HTML Input Event
    this.svCreated.emit({
      newServerName: newServerName.value,
      newServerContent: this.serverContentInput.nativeElement.value,
    });
  }

  onAddBlueprint(newServerName: HTMLInputElement): void {
    this.bpCreated.emit({
      newServerName: newServerName.value,
      newServerContent: this.serverContentInput.nativeElement.value,
    });
  }
}
