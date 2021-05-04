import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
  recipeSubscription: Subscription;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipeSubscription = this.route.params.subscribe(
      (params: Params) => this.recipe = this.recipeService.getRecipeById(+params['id'])
    );
  }

  onToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.router.navigate(['', 'shopping-list']);
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }

}
