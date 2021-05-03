import { ElementRef, Component, OnInit, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';

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

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAdd() {
    this.shoppingListService.addIngredient
      ( new Ingredient
        ( this.nameInputRef.nativeElement.value
        , this.amountInputRef.nativeElement.value
        )
      )
    ;

  }

}
