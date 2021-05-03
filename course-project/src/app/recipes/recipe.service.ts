import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model'

@Injectable({providedIn: 'root'})
export class RecipeService {
  recipes:Recipe[] = 
    [
      { name: 'A test recipe'
      , description: 'This is simply a test'
      , imagePath: 'https://via.placeholder.com/300'
      }
    , { name: 'Yet another test recipe'
      , description: 'This is another test'
      , imagePath: 'https://via.placeholder.com/300'
      }
    ]
  ;

  recipeSelected: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  selectRecipe(recipe: Recipe) {
    this.recipeSelected.emit(recipe);
  }
}