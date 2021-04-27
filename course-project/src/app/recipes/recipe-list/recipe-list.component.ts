import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes:Recipe[] = [
    {
      name: 'A test recipe',
      description: 'This is simply a test',
      imagePath: 'https://via.placeholder.com/150'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
