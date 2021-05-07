import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ShoppingListService } from '../shopping-list.service';

import { Ingredient } from './../../shared/ingredient.model'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  ingredientForm: FormGroup;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredientForm = new FormGroup
      ( { 'name': new FormControl(null, Validators.required)
        , 'amount': new FormControl(null, [Validators.required, this.numericValidator])
        }
      )
    ;
    
  }

  isInvalid(controlName: string) : boolean {
    let control = this.ingredientForm.get(controlName);
    return !control.valid && control.touched;
  }

  onAddIngredient() {
    this.shoppingListService.addIngredient(
      new Ingredient(this.ingredientForm.get('name').value, +this.ingredientForm.get('amount').value)
    )
    this.onClear();
  }

  onClear() {
    this.ingredientForm.reset();
  }

  private numericValidator(control: FormGroup): {[s:string]: boolean} {
    return isNaN(parseInt(control.value)) ? {'amountIsNaN': true } : null;
  }

}
