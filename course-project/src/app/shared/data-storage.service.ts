import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

const url = 'https://ng-complete-guide-1baa5-default-rtdb.firebaseio.com/';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: HttpClient, 
    private recipeService: RecipeService
  ) { }

  storeRecipes(): void {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(url + 'recipes.json', recipes)
      .subscribe( response => console.log(response) )
    ;
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${url}recipes.json?`)
      .pipe
        ( map( recipes => recipes.map(this.parseRecipe) )
        , tap( recipes => this.recipeService.setRecipes(recipes) )
        )
      ;
  }

  private parseRecipe(recipe: Recipe) {
    // La request original no devuelve el atributo 'ingredients' si está vacío
    return { 
      ...recipe
      , ingredients: recipe.ingredients ? recipe.ingredients : [] 
    };
  }
}
