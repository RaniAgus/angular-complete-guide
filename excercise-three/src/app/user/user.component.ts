import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: []
})
export class UserComponent implements OnInit {
  username: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.username = '';
  }

}
