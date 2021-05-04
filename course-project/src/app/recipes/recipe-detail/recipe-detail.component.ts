import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component
(
  { selector: 'app-recipe-detail'
  , templateUrl: './recipe-detail.component.html'
  , styleUrls: ['./recipe-detail.component.css']
  }
)
export class RecipeDetailComponent implements OnInit {
  recipe:Recipe;

  constructor(private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.recipe = this.recipeService.getSelectedRecipe();
    this.recipeService.selectedRecipeChanged.subscribe(
      () => this.recipe = this.recipeService.getSelectedRecipe()
    );
  }

  onToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.router.navigate(['', 'shopping-list']);
  }

}
