import { ElementRef, Output, EventEmitter } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Ingredient } from './../../shared/ingredient.model'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', {static: true})
  nameInputRef: ElementRef;

  @ViewChild('amountInput', {static: true})
  amountInputRef: ElementRef;

  @Output()
  addedIngredient = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {
  }

  onAdd() {
    this.addedIngredient.emit
      ( new Ingredient
        ( this.nameInputRef.nativeElement.value
        , this.amountInputRef.nativeElement.value
        )
      )
    ;

  }

}
