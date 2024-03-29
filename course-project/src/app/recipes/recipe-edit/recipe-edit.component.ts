import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  editMode = false;

  index: number;
  recipeForm: FormGroup;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params.id != null) {
        this.editMode = true;
        this.index = +params.id;
      }
      this.initForm(this.recipeService.getRecipeById(this.index)); // Muy importante cargarlo aca para cuando se reinicie la pagina!
    });
  }

  get ingredients(): AbstractControl[] {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onAddIngredient(): void {
    (this.recipeForm.get('ingredients') as FormArray).push(
      this.ingredientToFormGroup('', '')
    );
  }

  onDeleteIngredient(index: number): void {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  onSubmit(): void {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.index, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  private initForm(recipe): void {
    this.recipeForm = new FormGroup({
      name: new FormControl(
        this.editMode ? recipe.name : '',
        Validators.required
      ),
      description: new FormControl(
        this.editMode ? recipe.description : '',
        Validators.required
      ),
      imagePath: new FormControl(
        this.editMode ? recipe.imagePath : '',
        Validators.required
      ),
      ingredients: new FormArray(
        this.editMode ? this.getIngredientsFormGroups(recipe) : []
      ),
    });
  }

  private getIngredientsFormGroups(recipe): FormGroup[] {
    return recipe.ingredients.map((ingredient: Ingredient) =>
      this.ingredientToFormGroup(ingredient.name, ingredient.amount)
    );
  }

  private ingredientToFormGroup(name, amount): FormGroup {
    return new FormGroup({
      name: new FormControl(name, Validators.required),
      amount: new FormControl(amount, [
        Validators.required,
        Validators.pattern('[0-9]*[1-9][0-9]*'),
      ]),
    });
  }
}
