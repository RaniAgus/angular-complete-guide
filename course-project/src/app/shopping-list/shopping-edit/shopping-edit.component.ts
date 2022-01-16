import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingListService } from '../shopping-list.service';

import { Ingredient } from './../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  ingredientForm: FormGroup;
  editSubscription: Subscription;
  isEditing = false;
  editingItemId: number;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredientForm = new FormGroup
      ( { name: new FormControl(null, Validators.required)
        , amount: new FormControl(null, [Validators.required, Validators.pattern('[0-9]*[1-9][0-9]*')])
        }
      )
    ;
    this.editSubscription = this.shoppingListService.listenEditingElement
      ( (index: number) => {
          this.isEditing = true;
          this.editingItemId = index;
          this.ingredientForm.patchValue(this.shoppingListService.getIngredient(index));
        }
      )
    ;
  }

  ngOnDestroy(): void {
    this.editSubscription.unsubscribe();
  }

  isInvalid(controlName: string): boolean {
    const control = this.ingredientForm.get(controlName);
    return !control.valid && control.touched;
  }

  onSubmit(): void {
    const ingredient = new Ingredient(this.ingredientForm.get('name').value, +this.ingredientForm.get('amount').value);
    if (this.isEditing) {
      this.shoppingListService.updateIngredient(this.editingItemId, ingredient);
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }
    this.onClear();
  }

  onClear(): void {
    this.ingredientForm.reset();
    this.isEditing = false;
    this.editingItemId = undefined;
  }

  onDelete(): void {
    this.shoppingListService.deleteIngredient(this.editingItemId);
    this.onClear();
  }
}
