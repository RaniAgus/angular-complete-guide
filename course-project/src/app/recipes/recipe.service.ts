import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model'

@Injectable({providedIn: 'root'})
export class RecipeService {
  private recipes:Recipe[] = [];

  private recipesChanged: Subject<void> = new Subject<void>();

  constructor(private shoppingListService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]): void {
    this.recipes = recipes;
    this.recipesChanged.next();
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipeById(id: number): Recipe {
    return this.recipes[id];
  }

  removeRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipesChanged.next();
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next();
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients); // No hacemos addIngredient porque estaría emitiendo muchos eventos
  }

  listenRecipesChanges(fn) {
    return this.recipesChanged.subscribe(fn);
  }
}