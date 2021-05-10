import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

  index: number;
  recipe: Recipe;
  recipeForm: FormGroup;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if(params['id'] != null) {
          this.editMode = true;
          this.index = +params['id'];
          this.recipe = this.recipeService.getRecipeById(this.index);
          this.initForm(); // Muy importante cargarlo aca para cuando se reinicie la pagina!
        }
      }
    );
  }

  get ingredients() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }


  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(this.ingredientToFormGroup('', ''))
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  onSubmit() {
    console.log(this.index, this.recipeForm.value)
    if(this.editMode) {
      this.recipeService.updateRecipe(this.index, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  private initForm() {
    this.recipeForm = new FormGroup
    ( { 'name': new FormControl(this.editMode ? this.recipe.name : '', Validators.required)
      , 'description': new FormControl(this.editMode ? this.recipe.description : '', Validators.required)
      , 'imagePath': new FormControl(this.editMode ? this.recipe.imagePath : '', Validators.required)
      , 'ingredients': new FormArray(this.editMode ? this.ingredientsFormGroups : [])
      }
    );
  }

  private get ingredientsFormGroups() {
    return this.recipe.ingredients.map( (ingredient: Ingredient) => this.ingredientToFormGroup(ingredient.name, ingredient.amount) );
  }

  private ingredientToFormGroup(name, amount) {
    return new FormGroup
      ( { 'name': new FormControl(name, Validators.required)
        , 'amount': new FormControl(amount, [Validators.required, Validators.pattern("[0-9]*[1-9][0-9]*")])
        }
      )
    ;
  }

}
