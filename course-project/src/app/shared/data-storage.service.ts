import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

import { map } from 'rxjs/operators';

const url = 'https://ng-complete-guide-1baa5-default-rtdb.firebaseio.com/';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  storeRecipes(): void {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(url + 'recipes.json', recipes)
      .subscribe( response => console.log(response) )
    ;
  }

  fetchRecipes(): void {
    this.http
      .get<Recipe[]>(url + 'recipes.json')
      .pipe
        ( map
          ( recipes => recipes.map
            ( recipe => { 
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []} 
              }
            )
          )
        )
      .subscribe(recipes => this.recipeService.setRecipes(recipes))
    ;
  }
}
