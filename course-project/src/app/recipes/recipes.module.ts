import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "../app-routing.module";
import { DropdownDirective } from "../shared/dropdown.directive";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes.component";

@NgModule(
{ declarations: 
  [ RecipesComponent
  , RecipeListComponent
  , RecipeDetailComponent
  , RecipeItemComponent
  , RecipeEditComponent
  , RecipeStartComponent
  // No me quedó otra que importar la directiva para que los dropdowns funcionen
  , DropdownDirective
  ]
, imports: 
  [ CommonModule // ngIf y ngFor vienen de acá también 
    // (BrowserModule hace otras cosas de inicialización, no queremos importarlo)
  , FormsModule
  , ReactiveFormsModule
  , RouterModule 
  , AppRoutingModule
  ]
, exports: 
  [ RecipesComponent
  , RecipeListComponent
  , RecipeDetailComponent
  , RecipeItemComponent
  , RecipeEditComponent
  , RecipeStartComponent
  // Exporto la directiva para que también funcione el dropdown del navbar
  , DropdownDirective
  ]
})
export class RecipesModule {

}