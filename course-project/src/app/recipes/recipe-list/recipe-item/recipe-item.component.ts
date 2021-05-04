import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component
(
  { selector: 'app-recipe-item'
  , templateUrl: './recipe-item.component.html'
  , styleUrls: ['./recipe-item.component.css']
  }
)
export class RecipeItemComponent implements OnInit {
  @Input('recipeItem') recipe: Recipe;

  constructor(private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
  }

  onSelectedRecipe() {
    this.router.navigate(['', 'recipes', this.recipe.id]);
  }

}
