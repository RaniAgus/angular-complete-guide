import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model'

@Injectable({providedIn: 'root'})
export class RecipeService {
  private recipes:Recipe[] = 
    [ new Recipe
      ( 1
      , 'Milanesa con papas'
      , 'This is simply a test'
      , 'https://via.placeholder.com/300'
      , [ new Ingredient('Meat', 1)
        , new Ingredient('French Fries', 20)
        ]
      )
    , new Recipe
      ( 2
      , 'Hamburguesa'
      , 'This is another test'
      , 'https://via.placeholder.com/300'
      , [ new Ingredient('Buns', 2)
        , new Ingredient('Meat', 1)
        ]
      )
    ]
  ;

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipeById(id: number): Recipe {
    return this.recipes.find((recipe: Recipe) => recipe.id === id);
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients); // No hacemos addIngredient porque estaría emitiendo muchos eventos
  }
}