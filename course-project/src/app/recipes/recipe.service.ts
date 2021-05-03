import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
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

  recipeSelected: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  getRecipes() {
    return this.recipes.slice();
  }

  selectRecipe(recipe: Recipe) {
    this.recipeSelected.emit(recipe);
  }
}