import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "../app-routing.module";
import { AuthGuard } from "../auth/auth.guard";
import { DropdownDirective } from "../shared/dropdown.directive";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesResolverService } from "./recipes-resolver.service";
import { RecipesComponent } from "./recipes.component";

const routes = [
  { path: 'recipes'
    , component: RecipesComponent 
    , resolve: [RecipesResolverService] 
    , canActivate: [AuthGuard]
    , children:
      [ { path: ''        , component: RecipeStartComponent  }
      , { path: 'new'     , component: RecipeEditComponent   }
      , { path: ':id'     , component: RecipeDetailComponent }
      , { path: ':id/edit', component: RecipeEditComponent   }
      ]
  }
];

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
  , RouterModule.forChild(routes)
  ]
, exports: 
  [ RecipesComponent
  , RecipeListComponent
  , RecipeDetailComponent
  , RecipeItemComponent
  , RecipeEditComponent
  , RecipeStartComponent
  , RouterModule
  // Exporto la directiva para que también funcione el dropdown del navbar
  , DropdownDirective
  ]
})
export class RecipesModule {

}