import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component
(
  { selector: 'app-recipe-list'
  , templateUrl: './recipe-list.component.html'
  , styleUrls: ['./recipe-list.component.css']
  }
)
export class RecipeListComponent implements OnInit {
  recipes:Recipe[] = 
    [
      { name: 'A test recipe'
      , description: 'This is simply a test'
      , imagePath: 'https://via.placeholder.com/150'
      }
    , { name: 'Yet another test recipe'
      , description: 'This is another test'
      , imagePath: 'https://via.placeholder.com/150'
      }
    ]
  ;
  @Output() recipeSelected: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit(): void {
  }

}
