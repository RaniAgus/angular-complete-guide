import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({providedIn: 'root'})
export class ShoppingListService {
  private ingredients: Ingredient[] = 
    [ new Ingredient('Apples', 5)
    , new Ingredient('Tomatoes', 10)
    ]
  ;
  
  private ingredientsModified: Subject<Ingredient[]> = new Subject<Ingredient[]>();

  getIngredients() {
    return this.ingredients.slice();
  }

  listenAddedIngredients(callback) {
    return this.ingredientsModified.subscribe(callback);
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsModified.next(this.getIngredients());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients); // Esto convierte el array en una lista de parámetros
    this.ingredientsModified.next(this.getIngredients());
  }
}