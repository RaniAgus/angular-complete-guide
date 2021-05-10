import { Injectable } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({providedIn: 'root'})
export class ShoppingListService {
  private ingredients: Ingredient[] = 
    [ new Ingredient('Apples', 5)
    , new Ingredient('Tomatoes', 10)
    ]
  ;
  
  private ingredientsModified: Subject<Ingredient[]> = new Subject<Ingredient[]>();
  private editStarted: Subject<number> = new Subject<number>();

  getIngredients() {
    return this.ingredients.slice();
  }

  listenAddedIngredients(callback): Subscription {
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

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  editIngredient(index: number) {
    this.editStarted.next(index);
  }

  listenEditingElement(f): Subscription {
    return this.editStarted.subscribe(f);
  }

  updateIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.ingredientsModified.next(this.getIngredients());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsModified.next(this.getIngredients());
  }
}