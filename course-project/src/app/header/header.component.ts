import { Component, Output, EventEmitter } from '@angular/core'

@Component
(
  { selector: 'app-header'
  , templateUrl: './header.component.html'
  , styleUrls: ['header.component.css']
  }
)
export class HeaderComponent {
  @Output()
  recipesToggled = new EventEmitter();
  @Output()
  shoppingListToggled = new EventEmitter();
}