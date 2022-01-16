import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatStepperModule } from "@angular/material/stepper";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AlertComponent } from "./alert/alert.component";
import { DialogComponent } from "./dialog/dialog.component";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";

@NgModule(
{
  declarations: 
  [ AlertComponent
  , DialogComponent
  , LoadingSpinnerComponent
  , PlaceholderDirective
  , DropdownDirective
  ]
, imports: 
  [ CommonModule 
    // ngIf y ngFor vienen de acá también (BrowserModule hace otras cosas de 
    // inicialización, no queremos importarlo)
  , MatDialogModule
  , BrowserAnimationsModule
  , MatStepperModule
  ]
, exports: 
  [ AlertComponent
  , DialogComponent
  , LoadingSpinnerComponent
  , PlaceholderDirective
  , DropdownDirective
  , CommonModule
  ]
, entryComponents: [DialogComponent]
})
export class SharedModule {}