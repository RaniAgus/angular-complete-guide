import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model'

@Injectable({providedIn: 'root'})
export class RecipeService {
  private recipes:Recipe[] = 
    [ new Recipe
      ( 'Milanesa con papas'
      , 'This is simply a test'
      , 'https://via.placeholder.com/300'
      , [ new Ingredient('Meat', 1)
        , new Ingredient('French Fries', 20)
        ]
      )
    , new Recipe
      ( 'Hamburguesa'
      , 'This is another test'
      , 'https://via.placeholder.com/300'
      , [ new Ingredient('Buns', 2)
        , new Ingredient('Meat', 1)
        ]
      )
    ]
  ;

  private recipesChanged: Subject<void> = new Subject<void>();

  constructor(private shoppingListService: ShoppingListService) {}

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