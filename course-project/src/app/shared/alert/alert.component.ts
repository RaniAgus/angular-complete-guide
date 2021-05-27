import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() message: String;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  
  constructor() { }

  ngOnInit(): void {
  }

  onClose(): void {
    this.close.emit();
  }

}
