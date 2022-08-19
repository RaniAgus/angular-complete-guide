import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const recipesUrl = `https://${environment.FIREBASE_DATABASE_NAME}.firebaseio.com/recipes.json`;

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes(): void {
    const recipes = this.recipeService.getRecipes();
    this.http.put(recipesUrl, recipes).subscribe(
      (response) => console.log('recipes stored: ', response),
      (error) => console.log('error storing recipes: ', error)
    );
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(recipesUrl).pipe(
      map((recipes) => (recipes ? recipes.map(this.parseRecipe) : [])),
      tap((recipes) => this.recipeService.setRecipes(recipes))
    );
  }

  private parseRecipe(recipe: Recipe): Recipe {
    // La request original no devuelve el atributo 'ingredients' si está vacío
    return {
      ...recipe,
      ingredients: recipe.ingredients ? recipe.ingredients : [],
    };
  }
}
