import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  editMode: boolean = false;

  recipe: Recipe;
  recipeForm: FormGroup;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if(params['id'] != null) {
          this.editMode = true;
          this.recipe = this.recipeService.getRecipeById(+params['id']);
          this.initForm(); // Muy importante cargarlo aca para cuando se reinicie la pagina!
        }
      }
    );
  }

  get ingredients() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  private initForm() {
    this.recipeForm = new FormGroup
    ( { 'name': new FormControl(this.editMode ? this.recipe.name : '')
      , 'description': new FormControl(this.editMode ? this.recipe.description : '')
      , 'imagePath': new FormControl(this.editMode ? this.recipe.imagePath : '')
      , 'ingredients': new FormArray
          ( this.editMode 
              ? this.recipe.ingredients.map
                  ( (ingredient: Ingredient) => new FormGroup
                    ( { 'name': new FormControl(ingredient.name)
                      , 'amount': new FormControl(ingredient.amount)
                      }
                    )
                  ) 
              : []
          )
      }
    );
  }
}
